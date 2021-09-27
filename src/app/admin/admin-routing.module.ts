import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryAddComponent } from './component/category/category-add/category-add.component';
import { CategoryListComponent } from './component/category/category-list/category-list.component';
import { CategoryUpdateComponent } from './component/category/category-update/category-update.component';
import { CustommerAddComponent } from './component/custommer/custommer-add/custommer-add.component';
import { CustommerListComponent } from './component/custommer/custommer-list/custommer-list.component';
import { CustommerUpdateComponent } from './component/custommer/custommer-update/custommer-update.component';
import { HomeAdminComponent } from './component/home-admin/home-admin.component';
import { ProductAddComponent } from './component/product/product-add/product-add.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';


const routes: Routes = [
    {
      path: 'admin', component: AdminComponent,
      children: [
        { path: '', component: HomeAdminComponent },
        { path: 'home', component: HomeAdminComponent },
        { path: 'product/add', component: ProductAddComponent },
        { path: 'product/list', component: ProductListComponent },
        { path: 'category/add', component: CategoryAddComponent },
        { path: 'category/list', component: CategoryListComponent },
        { path: 'category/update/:categoryId', component: CategoryUpdateComponent },
        { path: 'customer/add', component: CustommerAddComponent },
        { path: 'customer/list', component: CustommerListComponent },
        { path: 'customer/update/:id', component: CustommerUpdateComponent }
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
