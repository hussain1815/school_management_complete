import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'school-management';

  constructor(
    private translate: TranslateService,
    private http: HttpClient
  ) {
    // Set default language
    this.translate.setDefaultLang('en');
    
    // Load translations
    this.loadTranslations();
  }

  ngOnInit() {
    // Set document direction based on language
    this.translate.onLangChange.subscribe((event) => {
      document.documentElement.dir = event.lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = event.lang;
      console.log('Language changed to:', event.lang, 'Direction:', document.documentElement.dir);
    });
  }

  private loadTranslations() {
    // Load both translation files simultaneously
    forkJoin({
      en: this.http.get('./assets/i18n/en.json'),
      ar: this.http.get('./assets/i18n/ar.json')
    }).subscribe({
      next: (translations: any) => {
        // Set translations with proper typing
        this.translate.setTranslation('en', translations.en as any);
        this.translate.setTranslation('ar', translations.ar as any);
        
        console.log('All translations loaded successfully');
        
        // Get language from localStorage or browser/default
        const savedLang = localStorage.getItem('selectedLanguage');
        let lang = 'en';
        
        if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
          lang = savedLang;
        } else {
          const browserLang = this.translate.getBrowserLang();
          lang = browserLang?.match(/en|ar/) ? browserLang : 'en';
        }
        
        this.translate.use(lang);
        localStorage.setItem('selectedLanguage', lang);
      },
      error: (error) => {
        console.error('Error loading translations:', error);
        // Fallback to English
        this.translate.use('en');
        localStorage.setItem('selectedLanguage', 'en');
      }
    });
  }
}
