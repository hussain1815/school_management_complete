import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-policies',
  imports: [CommonModule, TranslateModule, HeaderComponent, FooterComponent],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss'
})
export class PoliciesComponent {
  policySections = [
    { titleKey: 'POLICIES.DROP_OFF_TITLE', introKey: 'POLICIES.DROP_OFF_INTRO', listKey: 'POLICIES.DROP_OFF_LIST', noteKey: 'POLICIES.DROP_OFF_NOTE' },
    { titleKey: 'POLICIES.HOME_TIME_TITLE', introKey: 'POLICIES.HOME_TIME_INTRO', listKey: 'POLICIES.HOME_TIME_LIST', noteKey: 'POLICIES.HOME_TIME_NOTE' },
    { titleKey: 'POLICIES.HEALTH_TITLE', introKey: 'POLICIES.HEALTH_INTRO', listKey: 'POLICIES.HEALTH_LIST', noteKey: 'POLICIES.HEALTH_NOTE' },
    { titleKey: 'POLICIES.REGISTRATION_TITLE', introKey: 'POLICIES.REGISTRATION_INTRO', listKey: 'POLICIES.REGISTRATION_LIST', noteKey: 'POLICIES.REGISTRATION_NOTE' },
    { titleKey: 'POLICIES.FEES_TITLE', introKey: 'POLICIES.FEES_INTRO', listKey: 'POLICIES.FEES_LIST', noteKey: 'POLICIES.FEES_NOTE' },
    { titleKey: 'POLICIES.WITHDRAWAL_TITLE', introKey: 'POLICIES.WITHDRAWAL_INTRO', listKey: 'POLICIES.WITHDRAWAL_LIST', noteKey: 'POLICIES.WITHDRAWAL_NOTE' },
    { titleKey: 'POLICIES.FIRST_AID_TITLE', introKey: 'POLICIES.FIRST_AID_INTRO', listKey: 'POLICIES.FIRST_AID_LIST', noteKey: 'POLICIES.FIRST_AID_NOTE' },
    { titleKey: 'POLICIES.QUALITY_TITLE', introKey: 'POLICIES.QUALITY_INTRO', listKey: 'POLICIES.QUALITY_LIST', noteKey: 'POLICIES.QUALITY_NOTE' }
  ];

  constructor(private translate: TranslateService) {}

  getList(key: string): string[] {
    const result = this.translate.instant(key);
    return Array.isArray(result) ? result : [];
  }
}