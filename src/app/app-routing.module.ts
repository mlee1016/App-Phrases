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

import { TypeofphraseComponent } from './typeofphrase/typeofphrase.component';
const routes: Routes = [
  
    {path:'home',component:EdComponent},

    {path:'',component:EdComponent},
    //{path:'profile',redirectTo:'profile',pathMatch:'full'},
    // {path:'profile',component:ProComponent},

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

    {path:'feedback',component:FeedbackComponent},
    {path: 'privacy-policy', component:PrivacyPolicyComponent },
    {path: 'about',component:AboutComponent},
    // {path:'kanji/Japanese',component:KanjiComponent},
    // {path: 'verify-email/:uidb64/:token', component: ActivationComponent },
    // {path: 'profile/set-new-password',component:SetnewpasswordComponent},
    // {path: 'signup',component:SignupComponent},
    // {path: 'signin',component:SigninComponent},
    // {path: 'profile/subscriptions',component:AllplacesComponent}, 
    // {path: 'home/survey',component:DescriptionComponent},
    // {path: 'kanji/Japanese/studykanji-1',component:JpscoreComponent},
    // {path: 'kanji/Japanese/kanji-words',component:Jpscore2Component},
    // {path: 'kanji/Japanese/studykanji-2',component:PanelComponent},
    {path: 'terms-of-service', component: TermsOfServiceComponent },
    { path: '**', component: NotFoundComponent } // 👈 Catch-all, must be last

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],

  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
