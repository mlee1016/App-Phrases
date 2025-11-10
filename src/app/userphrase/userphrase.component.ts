import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel,FormsModule } from '@angular/forms';
import { PhrasenameService } from '../shared/phrasename.service';




interface PhraseData {
  phrase: string;
  pr: string;
  en: string;
  des: string;
}
@Component({
  selector: 'app-userphrase',
  standalone: true,


  imports: [CommonModule,FormsModule],
  templateUrl: './userphrase.component.html',
  styleUrl: './userphrase.component.css'
})
export class UserphraseComponent {
  selectedFile: File | null = null;
  uploaded = false;
  uploadTime: number | null = null;
  expirationHours = 24;
  phraseList: PhraseData[] = [];
  editMode = false;
  selectedLanguage: any;
  languages: any = ['Korean', 'Japanese', 'Italian', 'Russian'];
  selectedCategory: any
  categories: any = ["popular","course","story"]; ;

  constructor(private phraseS: PhrasenameService) {}
  
  
  ngOnInit() {
    const storedTime = localStorage.getItem('userUploadTime');
    if (storedTime) {
      this.uploadTime = parseInt(storedTime, 10);
      this.checkExpiration();
    }

    this.uploaded = localStorage.getItem('userUploadDone') === 'true';

    const storedData = localStorage.getItem('userPhraseData');
    if (storedData) {
      this.phraseList = JSON.parse(storedData);
    }
    if (this.phraseList.length !== 0) {
      // Merge loaded phrases into the service's userPhrases array.
      // Use push with spread if the service exposes an array; otherwise fall back to overwrite.
      if (Array.isArray(this.phraseS.userPhrases)) {
        (this.phraseS.userPhrases as any[]).push(...this.phraseList);
      } else {
        (this.phraseS as any).userPhrases = this.phraseList;
      }
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/json') {
      this.selectedFile = file;
    } else {
      alert('Please upload a valid JSON file.');
      this.selectedFile = null;
    }
  }

  uploadFile() {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (!Array.isArray(data)) throw new Error('Invalid format');
        this.phraseList = data;

        this.saveToLocal();
        this.uploaded = true;
        this.uploadTime = Date.now();
      } catch (err) {
        alert('❌ Invalid JSON format or structure.');
      }
    };
    reader.readAsText(this.selectedFile);
  }

  saveToLocal() {
    localStorage.setItem('userPhraseData', JSON.stringify(this.phraseList));
    localStorage.setItem('userUploadDone', 'true');
    localStorage.setItem('userUploadTime', Date.now().toString());
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    this.saveToLocal();
    this.editMode = false;
    alert('✅ Changes saved successfully!');
  }

  checkExpiration() {
    if (!this.uploadTime) return;
    const now = Date.now();
    const hoursPassed = (now - this.uploadTime) / (1000 * 60 * 60);
    if (hoursPassed >= this.expirationHours) {
      this.resetUpload();
    }
  }

  resetUpload() {
    localStorage.removeItem('userPhraseData');
    localStorage.removeItem('userUploadDone');
    localStorage.removeItem('userUploadTime');
    this.uploaded = false;
    this.phraseList = [];
    this.selectedFile = null;
    this.uploadTime = null;
  }
}





