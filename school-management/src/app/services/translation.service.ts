import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: any } = {};

  constructor(private translate: TranslateService) {
    this.initializeTranslations();
  }

  private initializeTranslations() {
    // English translations
    this.translations['en'] = {
      "HEADER": {
        "LOGO": "Abad Alshams",
        "HOME": "Home",
        "ABOUT": "About",
        "CURRICULUM": "Curriculum",
        "FACILITIES": "Facilities",
        "JOIN_US": "JOIN US"
      },
      "HERO": {
        "TITLE": "Where Every Child",
        "HIGHLIGHT": "Shines Brighter",
        "DESCRIPTION": "A nurturing, innovative environment in the heart of the city. We blend Montessori and Reggio Emilia approaches to spark curiosity.",
        "BOOK_TOUR": "Book a School Tour",
        "OUR_PROGRAMS": "Our Programs",
        "BADGE_TITLE": "100% Happy Kids",
        "BADGE_SUBTITLE": "Play-based learning"
      }
    };

    // Arabic translations
    this.translations['ar'] = {
      "HEADER": {
        "LOGO": "أبد الشمس",
        "HOME": "الرئيسية",
        "ABOUT": "حولنا",
        "CURRICULUM": "المنهج",
        "FACILITIES": "المرافق",
        "JOIN_US": "انضم إلينا"
      },
      "HERO": {
        "TITLE": "حيث كل طفل",
        "HIGHLIGHT": "يشع بريقاً أكثر",
        "DESCRIPTION": "بيئة رعاية ومبتكرة في قلب المدينة. نمزج بين منهجي مونتيسوري وريجيو إميليا لإثارة الفضول.",
        "BOOK_TOUR": "احجز جولة في المدرسة",
        "OUR_PROGRAMS": "برامجنا",
        "BADGE_TITLE": "100% أطفال سعداء",
        "BADGE_SUBTITLE": "التعلم القائم على اللعب"
      }
    };

    // Set translations
    this.translate.setTranslation('en', this.translations['en']);
    this.translate.setTranslation('ar', this.translations['ar']);
    
    // Set default language
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || 'en';
  }
}