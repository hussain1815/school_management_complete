import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Inquiry {
  id: number;
  parent_name: string;
  child_age: number;
  email: string;
  inquiry_Message: string;
  createdAt: string;
}

interface PaginatedResponse {
  data: Inquiry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface News {
  id: number;
  content: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  activeTab: 'inquiries' | 'news' = 'inquiries';
  inquiries: Inquiry[] = [];
  currentPage = 1;
  totalPages = 1;
  totalInquiries = 0;
  isLoading = false;
  user: any = null;
  showDeleteModal = false;
  deleteTargetId: number | null = null;
  deleteType: 'inquiry' | 'news' = 'inquiry';

  // News management
  newsList: News[] = [];
  isLoadingNews = false;
  showNewsForm = false;
  editingNews: News | null = null;
  newsForm = {
    content: '',
    isActive: true,
    order: 0
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.checkAuth();
    this.loadInquiries();
  }

  checkAuth() {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = JSON.parse(userStr);
  }

  getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  switchTab(tab: 'inquiries' | 'news') {
    this.activeTab = tab;
    if (tab === 'news' && this.newsList.length === 0) {
      this.loadNews();
    }
  }

  loadInquiries() {
    this.isLoading = true;
    
    this.http.get<PaginatedResponse>(
      `${environment.apiUrl}/inquiries?page=${this.currentPage}&limit=12`,
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (response) => {
        this.inquiries = response.data;
        this.totalPages = response.pagination.pages;
        this.totalInquiries = response.pagination.total;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading inquiries:', error);
        if (error.status === 401) {
          this.logout();
        }
        this.isLoading = false;
      }
    });
  }

  loadNews() {
    this.isLoadingNews = true;
    
    this.http.get<News[]>(
      `${environment.apiUrl}/news/all`,
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (news) => {
        this.newsList = news;
        this.isLoadingNews = false;
      },
      error: (error) => {
        console.error('Error loading news:', error);
        if (error.status === 401) {
          this.logout();
        }
        this.isLoadingNews = false;
      }
    });
  }

  toggleNewsForm() {
    this.showNewsForm = !this.showNewsForm;
    if (!this.showNewsForm) {
      this.cancelNewsEdit();
    }
  }

  editNews(news: News) {
    this.editingNews = news;
    this.newsForm = {
      content: news.content,
      isActive: news.isActive,
      order: news.order
    };
    this.showNewsForm = true;
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  saveNews() {
    if (!this.newsForm.content.trim()) {
      return;
    }

    // Auto-assign order if creating new news
    if (!this.editingNews) {
      this.newsForm.order = this.newsList.length + 1;
    }

    if (this.editingNews) {
      // Update existing news
      this.http.put<News>(
        `${environment.apiUrl}/news/${this.editingNews.id}`,
        this.newsForm,
        { headers: this.getAuthHeaders() }
      ).subscribe({
        next: () => {
          this.loadNews();
          this.cancelNewsEdit();
        },
        error: (error) => {
          console.error('Error updating news:', error);
        }
      });
    } else {
      // Create new news
      this.http.post<News>(
        `${environment.apiUrl}/news`,
        this.newsForm,
        { headers: this.getAuthHeaders() }
      ).subscribe({
        next: () => {
          this.loadNews();
          this.cancelNewsEdit();
        },
        error: (error) => {
          console.error('Error creating news:', error);
        }
      });
    }
  }

  cancelNewsEdit() {
    this.showNewsForm = false;
    this.editingNews = null;
    this.newsForm = {
      content: '',
      isActive: true,
      order: 0
    };
  }

  deleteNews(id: number) {
    this.deleteTargetId = id;
    this.deleteType = 'news';
    this.showDeleteModal = true;
  }

  deleteInquiry(id: number) {
    this.deleteTargetId = id;
    this.deleteType = 'inquiry';
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (this.deleteTargetId === null) return;

    const url = this.deleteType === 'news' 
      ? `${environment.apiUrl}/news/${this.deleteTargetId}`
      : `${environment.apiUrl}/inquiries/${this.deleteTargetId}`;

    this.http.delete(url, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.deleteTargetId = null;
        if (this.deleteType === 'news') {
          this.loadNews();
        } else {
          this.loadInquiries();
        }
      },
      error: (error) => {
        console.error(`Error deleting ${this.deleteType}:`, error);
        this.showDeleteModal = false;
        this.deleteTargetId = null;
      }
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.deleteTargetId = null;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadInquiries();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadInquiries();
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}