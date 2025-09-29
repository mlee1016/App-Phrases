import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {



  feedbackForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      console.log('Submitted:', this.feedbackForm.value);
      this.submitted = true;
      this.feedbackForm.reset();

      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        this.submitted = false;
      }, 4000);
    }
  }
}
