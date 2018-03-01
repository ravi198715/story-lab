import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FooterComponent } from './footer/footer.component';
import { UserConfigurationComponent } from './user-configuration/user-configuration.component';

const appRoutes: Routes = [
  { path: '', component: MainContentComponent },
  { path: 'configure', component: UserConfigurationComponent },
];
@NgModule({
  declarations: [
    AppComponent, HeaderComponent, NavMenuComponent, MainContentComponent, FooterComponent, UserConfigurationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
