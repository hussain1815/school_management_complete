import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
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

  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Reset messages
    this.successMessage = '';
    this.errorMessage = '';

    // Basic validation
    if (!this.formData.parentName || !this.formData.childAge || 
        !this.formData.email || !this.formData.message) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Age validation - must be a number and greater than 0
    const age = parseInt(this.formData.childAge);
    if (isNaN(age) || age <= 0) {
      this.errorMessage = 'Child age must be a valid number greater than 0';
      return;
    }

    this.isLoading = true;

    // Prepare data for API
    const inquiryData = {
      parent_name: this.formData.parentName,
      child_age: parseInt(this.formData.childAge),
      email: this.formData.email,
      inquiry_Message: this.formData.message
    };

    // Send to backend
    this.http.post(`${environment.apiUrl}/inquiries`, inquiryData)
      .subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.successMessage = 'Thank you for your inquiry! We will get back to you soon.';
          
          // Reset form
          this.formData = {
            parentName: '',
            childAge: '',
            email: '',
            message: ''
          };

          // Clear success message after 5 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.error || 'Failed to submit inquiry. Please try again.';
          
          // Clear error message after 5 seconds
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
  }
}
