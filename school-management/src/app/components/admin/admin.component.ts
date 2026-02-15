import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  inquiries: Inquiry[] = [];
  currentPage = 1;
  totalPages = 1;
  totalInquiries = 0;
  isLoading = false;
  user: any = null;

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

  loadInquiries() {
    this.isLoading = true;
    
    this.http.get<PaginatedResponse>(
      `/api/v1/inquiries?page=${this.currentPage}&limit=12`,
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

  deleteInquiry(id: number) {
    this.http.delete(`/api/v1/inquiries/${id}`, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.loadInquiries();
      },
      error: (error) => {
        console.error('Error deleting inquiry:', error);
      }
    });
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