import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypeComponent } from './type/type.component';
import { FormsModule,FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChoiceComponent } from './choice/choice.component';
import { ChatComponent } from './chat/chat.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AllphrasesService } from './allphrases.service';
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
import { PhraseStudyComponent } from './phrase-study/phrase-study.component';
import { ProgressComponent } from './progress/progress.component';
import { SCardComponent } from './s-card/s-card.component';
import { KboardComponent } from './kboard/kboard.component';
import { AutofocusDirective } from './autofocus.directive';
import { Jpscore2Component } from './jpscore2/jpscore2.component';
import { PanelComponent } from './panel/panel.component';

//import { HeaderInterceptor } from './header-interceptor';

import { CookieInterceptor } from './cookie.interceptor';
import { ActivationComponent } from './activation/activation.component';
import { SetnewpasswordComponent } from './setnewpassword/setnewpassword.component';
import { DescriptionComponent } from './description/description.component';
import { AlloptionsComponent } from './alloptions/alloptions.component';
import { KanjiComponent } from './kanji/kanji.component';
import { EdComponent } from './ed/ed.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { AresponseComponent } from './aresponse/aresponse.component';


/*const routes:Routes=[


  {path:'home',component:SelectedComponent},
  //{path:'',component:SelectedComponent},
  //{path:'profile',redirectTo:'profile',pathMatch:'full'},
  {path:'profile',component:ProComponent},
  {path:'chat/:id',component:ChatComponent},
  {path:'study/:id',component:StudyComponent},
  {path:'lists/:id',component:AllComponent},
  {path:'type/:id',component:TypeComponent},
  {path:'choice/:id',component:ChoiceComponent},
  {path:'language/:id',component:AboutComponent},
  {path:'kanji/Japanese',component:JpscoreComponent},


  {path:'feedback',component:FeedbackComponent},
  {path:'fillintheblank/:id',component:PhrasewordComponent},
  {path: 'signup',component:SignupComponent},
  {path: 'signin',component:SigninComponent}

]*/
@NgModule({
  declarations: [
    AppComponent,
    TypeComponent,
    ChoiceComponent,
    ChatComponent,
    StudyComponent,
    AllComponent,
    ProComponent,
    AboutComponent,
    JpscoreComponent,
    PhrasewordComponent,
    SelectedComponent,
    FeedbackComponent,
    SignupComponent,
    SigninComponent,
    AllplacesComponent,
    PhraseStudyComponent,
    ProgressComponent,
    SCardComponent,
    KboardComponent,
    AutofocusDirective,
    Jpscore2Component,
    PanelComponent,
    ActivationComponent,
    SetnewpasswordComponent,
    DescriptionComponent,
    AlloptionsComponent,
    KanjiComponent,
    EdComponent,
    NotFoundComponent,
    // AresponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),provideHttpClient(withFetch()),
    {
    provide: HTTP_INTERCEPTORS,
    useClass: CookieInterceptor,
    multi: true,
  },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
