import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { StudyComponent } from './study/study.component';
import { AllComponent } from './all/all.component';
import { ProComponent } from './pro/pro.component';
import { AboutComponent } from './about/about.component';
import { JpscoreComponent } from './jpscore/jpscore.component';
import { PhrasewordComponent } from './phraseword/phraseword.component';
import { SelectedComponent } from './selected/selected.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AllplacesComponent } from './allplaces/allplaces.component';
import { TypeComponent } from './type/type.component';

import { ChoiceComponent } from './choice/choice.component';
import { PhraseStudyComponent } from './phrase-study/phrase-study.component';

import { SCardComponent } from './s-card/s-card.component';
import { ActivationComponent } from './activation/activation.component';
import { EdComponent } from './ed/ed.component';
import { SetnewpasswordComponent } from './setnewpassword/setnewpassword.component';
import { DescriptionComponent } from './description/description.component';
import { AlloptionsComponent } from './alloptions/alloptions.component';
import { Jpscore2Component } from './jpscore2/jpscore2.component';
import { PanelComponent } from './panel/panel.component';
import { KanjiComponent } from './kanji/kanji.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProgressComponent } from './progress/progress.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { UserphraseComponent } from './userphrase/userphrase.component';
import { TypeofphraseComponent } from './typeofphrase/typeofphrase.component';
const routes: Routes = [
  
    {path:'home',component:EdComponent},

    {path:'',component:EdComponent},
    //comment this out
    {path:'profile',redirectTo:'profile',pathMatch:'full'},
    {path:'profile',component:ProComponent},
    //none rerender
    {path:'chat/:id/:m',component:ChatComponent},
    {path:'study/:id/:m',component:PhraseStudyComponent},
    {path:'lists/:id',component:AllComponent},
    {path:'type/:id/:m',component:TypeComponent}, 
    {path:'choice/:id/:m',component:ChoiceComponent},
    {path:'language/:id/:m',component:AlloptionsComponent}, 
    {path: 'cards/:id/:m',component:SCardComponent},
    {path:'fillintheblank/:id/:m',component:PhrasewordComponent},
    {path : 'language/:id', component: TypeofphraseComponent},
    {path: 'speech/:id/:m',component:ProgressComponent}, 


    

  /* -------------------------- LISTS -------------------------- */
  { path: 'lists/Korean', component: AllComponent },
  { path: 'lists/Japanese', component: AllComponent },
  { path: 'lists/Italian', component: AllComponent },
  { path: 'lists/Russian', component: AllComponent },

  { path: 'language/Korean', component: TypeofphraseComponent },
  { path: 'language/Japanese', component: TypeofphraseComponent },
  { path: 'language/Italian', component: TypeofphraseComponent },
  { path: 'language/Russian', component: TypeofphraseComponent },

  { path: 'language/Korean/story', component: AlloptionsComponent },
  { path: 'language/Korean/popular', component: AlloptionsComponent },
  { path: 'language/Korean/course', component: AlloptionsComponent },

  { path: 'language/Japanese/story', component: AlloptionsComponent },
  { path: 'language/Japanese/popular', component: AlloptionsComponent },
  { path: 'language/Japanese/course', component: AlloptionsComponent },

  { path: 'language/Italian/story', component: AlloptionsComponent },
  { path: 'language/Italian/popular', component: AlloptionsComponent },
  { path: 'language/Italian/course', component: AlloptionsComponent },

  { path: 'language/Russian/story', component: AlloptionsComponent },
  { path: 'language/Russian/popular', component: AlloptionsComponent },
  { path: 'language/Russian/course', component: AlloptionsComponent },

  { path: 'study/Korean/story', component: PhraseStudyComponent },
  { path: 'study/Japanese/story', component: PhraseStudyComponent },
  { path: 'study/Italian/story', component: PhraseStudyComponent },
  { path: 'study/Russian/story', component: PhraseStudyComponent },

  { path: 'study/Korean/popular', component: PhraseStudyComponent },
  { path: 'study/Japanese/popular', component: PhraseStudyComponent },
  { path: 'study/Italian/popular', component: PhraseStudyComponent },
  { path: 'study/Russian/popular', component: PhraseStudyComponent },

  { path: 'study/Korean/course', component: PhraseStudyComponent },
  { path: 'study/Japanese/course', component: PhraseStudyComponent },
  { path: 'study/Italian/course', component: PhraseStudyComponent },
  { path: 'study/Russian/course', component: PhraseStudyComponent },

  { path: 'type/Korean/story', component: TypeComponent },
  { path: 'type/Japanese/story', component: TypeComponent },
  { path: 'type/Italian/story', component: TypeComponent },
  { path: 'type/Russian/story', component: TypeComponent },

  { path: 'type/Korean/popular', component: TypeComponent },
  { path: 'type/Japanese/popular', component: TypeComponent },
  { path: 'type/Italian/popular', component: TypeComponent },
  { path: 'type/Russian/popular', component: TypeComponent },

  { path: 'type/Korean/course', component: TypeComponent },
  { path: 'type/Japanese/course', component: TypeComponent },
  { path: 'type/Italian/course', component: TypeComponent },
  { path: 'type/Russian/course', component: TypeComponent },

  /* ------------------------- CARDS PAGES --------------------- */
  { path: 'cards/Korean/story', component: SCardComponent },
  { path: 'cards/Japanese/story', component: SCardComponent },
  { path: 'cards/Italian/story', component: SCardComponent },
  { path: 'cards/Russian/story', component: SCardComponent },

  { path: 'cards/Korean/popular', component: SCardComponent },
  { path: 'cards/Japanese/popular', component: SCardComponent },
  { path: 'cards/Italian/popular', component: SCardComponent },
  { path: 'cards/Russian/popular', component: SCardComponent },

  { path: 'cards/Korean/course', component: SCardComponent },
  { path: 'cards/Japanese/course', component: SCardComponent },
  { path: 'cards/Italian/course', component: SCardComponent },
  { path: 'cards/Russian/course', component: SCardComponent },

  /* ------------------------- CHOICE PAGES -------------------- */
  { path: 'choice/Korean/story', component: ChoiceComponent },
  { path: 'choice/Japanese/story', component: ChoiceComponent },
  { path: 'choice/Italian/story', component: ChoiceComponent },
  { path: 'choice/Russian/story', component: ChoiceComponent },

  { path: 'choice/Korean/popular', component: ChoiceComponent },
  { path: 'choice/Japanese/popular', component: ChoiceComponent },
  { path: 'choice/Italian/popular', component: ChoiceComponent },
  { path: 'choice/Russian/popular', component: ChoiceComponent },

  { path: 'choice/Korean/course', component: ChoiceComponent },
  { path: 'choice/Japanese/course', component: ChoiceComponent },
  { path: 'choice/Italian/course', component: ChoiceComponent },
  { path: 'choice/Russian/course', component: ChoiceComponent },

  /* --------------------- FILL-IN-THE-BLANK (COURSE ONLY) ---- */
  { path: 'fillintheblank/Korean/course', component: PhrasewordComponent },
  { path: 'fillintheblank/Japanese/course', component: PhrasewordComponent },
  { path: 'fillintheblank/Italian/course', component: PhrasewordComponent },
  { path: 'fillintheblank/Russian/course', component: PhrasewordComponent },

  /* ------------------------- SPEECH PAGES -------------------- */
  { path: 'speech/Korean/story', component: ProgressComponent },
  { path: 'speech/Japanese/story', component: ProgressComponent },
  { path: 'speech/Italian/story', component: ProgressComponent },
  { path: 'speech/Russian/story', component: ProgressComponent },

  /* --------------------------- CHAT PAGES -------------------- */
  { path: 'chat/Korean/story', component: ChatComponent },
  { path: 'chat/Japanese/story', component: ChatComponent },
  { path: 'chat/Italian/story', component: ChatComponent },
  { path: 'chat/Russian/story', component: ChatComponent },


    {path: 'own', component:UserphraseComponent},
    {path:'feedback',component:FeedbackComponent},
    {path: 'privacy-policy', component:PrivacyPolicyComponent },
    {path: 'about',component:AboutComponent},
    // {path:'kanji/Japanese',component:KanjiComponent},
    // {path: 'verify-email/:uidb64/:token', component: ActivationComponent },
    // {path: 'profile/set-new-password',component:SetnewpasswordComponent},
    //comment this out until ready 
    {path: 'signup',component:SignupComponent},
    {path: 'signin',component:SigninComponent},
    // {path: 'profile/subscriptions',component:AllplacesComponent}, 
    // {path: 'home/survey',component:DescriptionComponent},
    // {path: 'kanji/Japanese/studykanji-1',component:JpscoreComponent},
    // {path: 'kanji/Japanese/kanji-words',component:Jpscore2Component},
    // {path: 'kanji/Japanese/studykanji-2',component:PanelComponent},


    // ng build --configuration production && ng run AppPhrases:prerender

    {path: 'terms-of-service', component: TermsOfServiceComponent },
    
    { path: '**', component: NotFoundComponent } // 👈 Catch-all, must be last

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
