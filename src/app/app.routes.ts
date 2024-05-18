import { Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/form/:Code', component: ProductFormComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customer/form/:Code', component: CustomerFormComponent }
];
