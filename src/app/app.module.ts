import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatSliderModule } from '@angular/material/slider';
import { PrincipalModule } from './components/principal/principal.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [PrincipalModule,
    BrowserModule,
    AppRoutingModule,
  //  MatCarouselModule,
    BrowserAnimationsModule,
  ], exports: [PrincipalModule,],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
