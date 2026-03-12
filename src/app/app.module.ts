import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { MyRepositoriesComponent } from './components/my-repositories/my-repositories.component';
import { StudiesComponent } from './components/studies/studies.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './shared/body/header/header.component';
import { FooterComponent } from './shared/body/footer/footer.component';
import { ProfessionalContributionsComponent } from './components/professional-contributions/professional-contributions.component';
import {ClipboardModule} from '@angular/cdk/clipboard';


import { ThreeCanvasComponent } from './components/home/three-canvas/three-canvas.component';
import { RepoCardComponent } from './shared/repo-card/repo-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutMeComponent,
    ProfessionalContributionsComponent,
    MyRepositoriesComponent,
    StudiesComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    ThreeCanvasComponent,
    RepoCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
