import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusDirectiveDirective } from './component/focusService/focus.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateInputConverter } from './convertDate/date-input-converter.directive';

import { AdminComponent } from './admin.component';
import { ProductAddComponent } from './component/product/product-add/product-add.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';
import { HomeAdminComponent } from './component/home-admin/home-admin.component';
import { HeaderAdminComponent } from './component/layout/header-admin/header-admin.component';
import { MenuAdminComponent } from './component/layout/menu-admin/menu-admin.component';
import { CategoryAddComponent } from './component/category/category-add/category-add.component';
import { CategoryListComponent } from './component/category/category-list/category-list.component';
import { CategoryUpdateComponent } from './component/category/category-update/category-update.component';
import { ProductUpdateComponent } from './component/product/product-update/product-update.component';
import { ControlMessageComponent } from './component/validate/control-message.component';
import { AccountListComponent } from './component/account/account-list/account-list.component';
import { AccountAddComponent } from './component/account/account-add/account-add.component';
import { AccountUpdateComponent } from './component/account/account-update/account-update.component';
import { OrderComponent } from './component/order/order.component';
import { StatisticsComponent } from './component/statistics/statistics.component';


@NgModule({
  declarations: [
    AdminComponent,
    ProductAddComponent,
    ProductListComponent,
    HomeAdminComponent,
    HeaderAdminComponent,
    MenuAdminComponent,
    CategoryAddComponent,
    CategoryListComponent,
    CategoryUpdateComponent,
    ProductUpdateComponent,
    ControlMessageComponent,
    AutoFocusDirectiveDirective,
    AccountListComponent,
    AccountAddComponent,
    AccountUpdateComponent,
    OrderComponent,
    StatisticsComponent,
    DateInputConverter
  ],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AdminComponent]
})
export class AdminModule { }
