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

interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
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
  activeTab: 'inquiries' | 'news' | 'gallery' = 'inquiries';
  inquiries: Inquiry[] = [];
  currentPage = 1;
  totalPages = 1;
  totalInquiries = 0;
  isLoading = false;
  user: any = null;
  showDeleteModal = false;
  deleteTargetId: number | null = null;
  deleteType: 'inquiry' | 'news' | 'gallery' = 'inquiry';

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

  // Gallery management
  galleryList: GalleryImage[] = [];
  isLoadingGallery = false;
  isSavingGallery = false;
  showGalleryForm = false;
  editingGallery: GalleryImage | null = null;
  galleryForm = { title: '', isActive: true };
  galleryImageFile: File | null = null;
  galleryImagePreview: string | null = null;
  private apiBase = environment.apiUrl.replace('/api/v1', '');

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

  switchTab(tab: 'inquiries' | 'news' | 'gallery') {
    this.activeTab = tab;
    if (tab === 'news' && this.newsList.length === 0) {
      this.loadNews();
    }
    if (tab === 'gallery' && this.galleryList.length === 0) {
      this.loadGallery();
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

    let url: string;
    if (this.deleteType === 'news') {
      url = `${environment.apiUrl}/news/${this.deleteTargetId}`;
    } else if (this.deleteType === 'gallery') {
      url = `${environment.apiUrl}/gallery/${this.deleteTargetId}`;
    } else {
      url = `${environment.apiUrl}/inquiries/${this.deleteTargetId}`;
    }

    this.http.delete(url, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.showDeleteModal = false;
        this.deleteTargetId = null;
        if (this.deleteType === 'news') {
          this.loadNews();
        } else if (this.deleteType === 'gallery') {
          this.loadGallery();
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

  // Gallery methods
  loadGallery() {
    this.isLoadingGallery = true;
    this.http.get<GalleryImage[]>(
      `${environment.apiUrl}/gallery/all`,
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (images) => { this.galleryList = images; this.isLoadingGallery = false; },
      error: (error) => {
        console.error('Error loading gallery:', error);
        if (error.status === 401) this.logout();
        this.isLoadingGallery = false;
      }
    });
  }

  toggleGalleryForm() {
    this.showGalleryForm = !this.showGalleryForm;
    if (!this.showGalleryForm) this.cancelGalleryEdit();
  }

  onGalleryFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.galleryImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => { this.galleryImagePreview = e.target?.result as string; };
      reader.readAsDataURL(this.galleryImageFile);
    }
  }

  editGalleryImage(img: GalleryImage) {
    this.editingGallery = img;
    this.galleryForm = { title: img.title, isActive: img.isActive };
    this.galleryImageFile = null;
    this.galleryImagePreview = this.getGalleryImageUrl(img);
    this.showGalleryForm = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  saveGalleryImage() {
    if (!this.galleryForm.title.trim()) return;
    if (!this.editingGallery && !this.galleryImageFile) return;

    this.isSavingGallery = true;

    const formData = new FormData();
    formData.append('title', this.galleryForm.title);
    formData.append('isActive', String(this.galleryForm.isActive));
    formData.append('order', String(this.galleryList.length + 1));
    if (this.galleryImageFile) formData.append('image', this.galleryImageFile);

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    if (this.editingGallery) {
      this.http.put(`${environment.apiUrl}/gallery/${this.editingGallery.id}`, formData, { headers }).subscribe({
        next: () => {
          this.isSavingGallery = false;
          this.loadGallery();
          this.cancelGalleryEdit();
        },
        error: (err) => {
          console.error('Error updating gallery image:', err);
          this.isSavingGallery = false;
          alert('Failed to update image. Please try again.');
        }
      });
    } else {
      this.http.post(`${environment.apiUrl}/gallery`, formData, { headers }).subscribe({
        next: () => {
          this.isSavingGallery = false;
          this.loadGallery();
          this.cancelGalleryEdit();
        },
        error: (err) => {
          console.error('Error creating gallery image:', err);
          this.isSavingGallery = false;
          alert('Failed to upload image. Please try again.');
        }
      });
    }
  }

  cancelGalleryEdit() {
    this.showGalleryForm = false;
    this.editingGallery = null;
    this.galleryForm = { title: '', isActive: true };
    this.galleryImageFile = null;
    this.galleryImagePreview = null;
  }

  deleteGalleryImage(id: number) {
    this.deleteTargetId = id;
    this.deleteType = 'gallery';
    this.showDeleteModal = true;
  }

  getGalleryImageUrl(img: GalleryImage): string {
    return img.imageUrl.startsWith('http') ? img.imageUrl : `${this.apiBase}${img.imageUrl}`;
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