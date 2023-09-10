
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';

import { NavbarComponent } from './layouts/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ApiService } from 'src/services/api.service';
import { MenuCategoriesComponent } from './components/menu-categories/menu-categories.component';
import { PaginationComponent } from './utils/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MaterialModule=[
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatTableModule,
  MatDividerModule,
  MatDialogModule,
  MatButtonModule,
  MatTabsModule
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MenuListComponent,
    MenuCategoriesComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [ApiService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
