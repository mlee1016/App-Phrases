import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

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

  /*onSubmit() {
    if (this.feedbackForm.valid) {
      console.log('Submitted:', this.feedbackForm.value);
      this.submitted = true;
      this.feedbackForm.reset();

      // Auto-hide success message after 4 seconds
      setTimeout(() => {
        this.submitted = false;
      }, 4000);
    }
  }*/
  onSubmit() {
    if (this.feedbackForm.valid) {
      const formData = this.feedbackForm.value;

      emailjs.send(

        'service_e9hdlvv',
        'template_k06pp8g',
        formData,
        'xtgUnpev6l3Yu5vX_'
      ).then(() => {
        this.submitted = true;
        this.feedbackForm.reset();
        setTimeout(() => this.submitted = false, 4000);
      }).catch(err => {
        console.error('EmailJS error:', err);
        alert('⚠️ Something went wrong. Try again later.');
      });
    }
  }

}
