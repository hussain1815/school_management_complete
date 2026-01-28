import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formData = {
    parentName: '',
    childAge: '',
    email: '',
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.formData);
    // Handle form submission here
    alert('Thank you for your inquiry! We will get back to you soon.');
    
    // Reset form
    this.formData = {
      parentName: '',
      childAge: '',
      email: '',
      message: ''
    };
  }
}
