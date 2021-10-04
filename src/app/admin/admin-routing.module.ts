import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AccountAddComponent } from './component/account/account-add/account-add.component';
import { AccountListComponent } from './component/account/account-list/account-list.component';
import { AccountUpdateComponent } from './component/account/account-update/account-update.component';
import { CategoryAddComponent } from './component/category/category-add/category-add.component';
import { CategoryListComponent } from './component/category/category-list/category-list.component';
import { CategoryUpdateComponent } from './component/category/category-update/category-update.component';
// import { CustommerAddComponent } from './component/custommer/custommer-add/custommer-add.component';
// import { CustommerListComponent } from './component/custommer/custommer-list/custommer-list.component';
// import { CustommerUpdateComponent } from './component/custommer/custommer-update/custommer-update.component';
import { HomeAdminComponent } from './component/home-admin/home-admin.component';
import { OrderComponent } from './component/order/order.component';
import { ProductAddComponent } from './component/product/product-add/product-add.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';
import { ProductUpdateComponent } from './component/product/product-update/product-update.component';


const routes: Routes = [
    {
      path: 'admin', component: AdminComponent,
      children: [
        { path: '', component: HomeAdminComponent },
        { path: 'home', component: HomeAdminComponent },
        { path: 'product/add', component: ProductAddComponent },
        { path: 'product/list', component: ProductListComponent },
        { path: 'product/update/:productId', component: ProductUpdateComponent },
        { path: 'category/add', component: CategoryAddComponent },
        { path: 'category/list', component: CategoryListComponent },
        { path: 'category/update/:categoryId', component: CategoryUpdateComponent },
        { path: 'account/add', component: AccountAddComponent },
        { path: 'account/list', component: AccountListComponent },
        { path: 'account/update/:id', component: AccountUpdateComponent },
        { path: 'order/list', component: OrderComponent },

      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
