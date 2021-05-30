import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './component/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { ListComponent } from './component/list/list.component';
import { ListItemComponent } from './component/list-item/list-item.component';
import {MatCardModule} from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';


import { ItemService } from './services/item.service';
import { AddItemComponent } from './component/add-item/add-item.component';
import { EocProfileComponent } from './component/eoc-profile/eoc-profile.component';
import { EditItemComponent } from './component/edit-item/edit-item.component';
import { FilterItemComponent } from './component/filter-item/filter-item.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    ListItemComponent,
    AddItemComponent,
    EocProfileComponent,
    EditItemComponent,
    FilterItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    FormsModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
