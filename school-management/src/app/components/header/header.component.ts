import { Component } from '@angular/core';
import { PdfDownloadService } from '../../services/pdf-download.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private pdfService: PdfDownloadService) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  downloadEnrollmentForm() {
    this.pdfService.downloadEnrollmentForm();
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    
    // Close mobile menu if open
    this.isMenuOpen = false;
    
    // Map section IDs to actual element IDs
    const sectionMap: { [key: string]: string } = {
      'home': 'hero-section',
      'about': 'welcome-section', 
      'curriculum': 'curriculum-section',
      'facilities': 'experience-section',
      'contact': 'contact-section'
    };
    
    const targetId = sectionMap[sectionId];
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerHeight = 70; // Account for fixed header height
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }
}
