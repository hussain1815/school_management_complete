import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface News {
  id: number;
  content: string;
  isActive: boolean;
  order: number;
}

@Component({
  selector: 'app-news-ticker',
  imports: [CommonModule],
  templateUrl: './news-ticker.component.html',
  styleUrl: './news-ticker.component.scss'
})
export class NewsTickerComponent implements OnInit {
  news: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.http.get<News[]>(`${environment.apiUrl}/api/v1/news`).subscribe({
      next: (newsItems) => {
        if (newsItems && newsItems.length > 0) {
          this.news = newsItems.map(item => item.content);
        } else {
          // Fallback to default news if no items in database
          this.news = [
            'Montessori + Reggio Emilia Inspired Learning — A unique blend of play-based and workstation-style education.',
            'Explore Our Workstations! Art • Literacy • Science • Sensory • Math — hands-on learning at its best.',
            '✨ Registration Open for 2026–27! Give your child the best start—limited seats available. Enroll now and enjoy a special fee discount!'
          ];
        }
      },
      error: (error) => {
        console.error('Error loading news:', error);
        // Fallback to default news on error
        this.news = [
          'Montessori + Reggio Emilia Inspired Learning — A unique blend of play-based and workstation-style education.',
          'Explore Our Workstations! Art • Literacy • Science • Sensory • Math — hands-on learning at its best.',
          '✨ Registration Open for 2026–27! Give your child the best start—limited seats available. Enroll now and enjoy a special fee discount!'
        ];
      }
    });
  }
}
