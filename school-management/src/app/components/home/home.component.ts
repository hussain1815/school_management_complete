import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeroComponent } from '../hero/hero.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { PhilosophyComponent } from '../philosophy/philosophy.component';
import { PersonalityComponent } from '../personality/personality.component';
import { ExperienceComponent } from '../experience/experience.component';
import { CurriculumComponent } from '../curriculum/curriculum.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeroComponent, WelcomeComponent, PhilosophyComponent, PersonalityComponent, ExperienceComponent, CurriculumComponent, TestimonialsComponent, ContactComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}