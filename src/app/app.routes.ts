import { Routes } from '@angular/router';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { StoresComponent } from './stores/stores.component';
import { StoreFormComponent } from './stores/store-form/store-form.component';
import { LoginComponent } from './home/login/login.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customer/form/:Code/:CustomerId', component: CustomerFormComponent },
  { path: 'stores', component: StoresComponent },
  { path: 'store/add', component: StoreFormComponent },
  { path: 'store/form/:Code', component: StoreFormComponent },
  { path: 'login', component: LoginComponent },
];
