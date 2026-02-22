import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { environment } from '../../../environments/environment';

interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

interface GalleryResponse {
  data: GalleryImage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  images: GalleryImage[] = [];
  currentPage = 1;
  totalPages = 1;
  totalImages = 0;
  isLoading = false;
  selectedImage: GalleryImage | null = null;
  private apiBase = environment.apiUrl.replace('/api/v1', '');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    this.isLoading = true;
    this.http.get<GalleryResponse>(
      `${environment.apiUrl}/gallery?page=${this.currentPage}&limit=12`
    ).subscribe({
      next: (res) => {
        this.images = res.data;
        this.totalPages = res.pagination.pages;
        this.totalImages = res.pagination.total;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  getImageUrl(img: GalleryImage): string {
    return img.imageUrl.startsWith('http') ? img.imageUrl : `${this.apiBase}${img.imageUrl}`;
  }

  openLightbox(img: GalleryImage) { this.selectedImage = img; }
  closeLightbox() { this.selectedImage = null; }

  nextPage() {
    if (this.currentPage < this.totalPages) { this.currentPage++; this.loadImages(); }
  }

  prevPage() {
    if (this.currentPage > 1) { this.currentPage--; this.loadImages(); }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadImages();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }
}
