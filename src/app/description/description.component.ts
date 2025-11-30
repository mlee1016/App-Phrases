import { Component, EventEmitter, Output ,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-description', 
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent {

 


  constructor(private http: HttpClient) {}  

  // 🔹 Parent -> child communication
  @Input() showSurvey = false;

  // 🔹 Child -> parent events
  @Output() close = new EventEmitter<void>();
  @Output() submitSurvey2 = new EventEmitter<any>();

  // 🔹 Survey model
  surveyData = {
    heardFrom: '',
    language: '',
    subscription: 'free'
  };

  // 🔹 Options
  heardOptions = [
    'Engine Search',
    'Friend/Referral',
    'Social Media',
    'Other'
  ];

  languageOptions = [
    'Korean',
    'Japanese',
    'Italian',
    'Russian'
  ];

  subscriptionOptions = [
    { label: 'Free', value: 'free' },
    { label: '6 Months - $3', value: '6m' },
    { label: '1 Year - $5', value: '1y' }
  ];

  // 🔹 API base URL
  private url_base = 'http://127.0.0.1:8000/api';

  // 🔹 Submit Survey
  submitSurvey() {
    this.http.post(`${this.url_base}/survey/`, this.surveyData, { withCredentials: true })
      .subscribe({
        next: (res) => {
          alert('✅ Thanks for completing the survey!');
          this.submitSurvey2.emit(this.surveyData); // notify parent
          this.close.emit();                        // close modal
          this.showSurvey = false;
        },
        error: (err) => {
          console.error('Survey submission failed', err);
          alert('❌ Error submitting survey');
        }
      });
  }
}


  /*constructor(private http: HttpClient) {}

// survey-modal.component.ts
  @Output() close = new EventEmitter<void>();
  @Output() submitSurvey2 = new EventEmitter<any>();

  surveyData = {
    heardFrom: '',
    language: '',
    subscription: 'free'
  };

  heardOptions = [
    'Engine Search',
    'Friend/Referral',
    'Social Media',
    'Other'
  ];

  languageOptions = [
    'Korean',
    'Japanese',
    'Italian',
    'Russian'
  ];

  subscriptionOptions = [
    { label: 'Free', value: 'free' },
    { label: '6 Months - $3', value: '6m' },
    { label: '1 Year - $5', value: '1y' }
  ];

  // onSubmit() {
  //   this.submitSurvey.emit(this.surveyData);
  //   this.close.emit(); // close modal
  // }


  @Input() showSurvey = false;
  url_sign_in:string ="http://127.0.0.1:8000/api"


  submitSurvey() {
    this.http.post(`${this.url_sign_in}/survey/`, this.surveyData).subscribe({
      next: () => {
        alert('Thanks for completing the survey!');
        this.showSurvey = false;
      },
      error: () => alert('Error submitting survey')
    });
  }*/

