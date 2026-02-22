import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { PdfDownloadService } from '../../services/pdf-download.service';

@Component({
  selector: 'app-header',
  imports: [TranslateModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  currentLang = 'en';

  constructor(
    private pdfService: PdfDownloadService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to language changes
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang = event.lang;
    });
    
    // Set initial language
    this.currentLang = this.translate.currentLang || this.translate.defaultLang || 'en';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  switchLanguage() {
    const newLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(newLang).subscribe(() => {
      this.currentLang = newLang;
      // Save language preference to localStorage
      localStorage.setItem('selectedLanguage', newLang);
      console.log('Language switched to:', newLang); // Debug log
    });
    this.isMenuOpen = false; // Close menu after language switch
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
    
    // Check if we're on the home page
    if (this.router.url === '/' || this.router.url === '') {
      // We're on home page, scroll directly
      this.scrollToElement(targetId);
    } else {
      // We're on a different page, navigate to home first then scroll
      this.router.navigate(['/']).then(() => {
        // Wait a bit for the page to load, then scroll
        setTimeout(() => {
          this.scrollToElement(targetId);
        }, 100);
      });
    }
  }

  private scrollToElement(targetId: string) {
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
