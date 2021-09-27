import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { HomeComponent } from './component/home/home.component';
import { AbountComponent } from './component/abount/abount.component';
import { ProductListComponent } from './component/product-list/product-list.component';

@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    AbountComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    UserRoutingModule
  ],
  providers: [],
  bootstrap: [UserComponent]
})
export class UserModule { }
