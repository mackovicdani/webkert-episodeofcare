import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './component/add-item/add-item.component';
import { EditItemComponent } from './component/edit-item/edit-item.component';
import { EocProfileComponent } from './component/eoc-profile/eoc-profile.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit', children: [{
    path: ':id', component: EditItemComponent
  }]},
  { path: 'add', component: AddItemComponent },
  { path: ':id', component: EocProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
