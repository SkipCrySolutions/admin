import { Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { StoresComponent } from './stores/stores.component';
import { StoreFormComponent } from './stores/store-form/store-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/form/:Code/:StoreCode/:id', component: ProductFormComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customer/form/:Code/:CustomerId', component: CustomerFormComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'store/form/:Code', component: StoreFormComponent },
];
