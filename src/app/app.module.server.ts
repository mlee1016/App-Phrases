import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { RouterModule } from '@angular/router';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AgainComponent } from './again/again.component';
@NgModule({ 
  imports: [
    AppModule,
    ServerModule,
    RouterModule,
    AgainComponent
  ],
  bootstrap: [AppComponent],
  exports: [AgainComponent]
})
export class AppServerModule {}
