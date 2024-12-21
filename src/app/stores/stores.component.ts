import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from './store.model';
import { Router } from '@angular/router';
import { StoreService } from './store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stores',
  templateUrl: 'stores.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class StoresComponent {
  public stores: Store[] = [];

  constructor(private router: Router, private storeService: StoreService) {
    this.getStores();
  }

  private getStores(): void {
    this.storeService.getStores().subscribe((resp: Store[]) => {
      this.stores = resp;
    });
  }

  public editStore(store: Store) {
    this.router.navigate(['store', 'form', store.StoreId]);
  }

  public addStore() {
    this.router.navigate(['store', 'add']);
  }
  public deleteStore(store: Store) {
    if (!store._id) {
      console.error('Store _id is missing');
      return; // Exit the function if _id is undefined
    }

    if (confirm('Are you sure you want to delete this store?')) {
      this.storeService.deleteStore(store._id).subscribe(() => {
        console.log('Store deleted successfully.');
        this.stores = this.stores.filter((s) => s._id !== store._id);
      });
    }
  }
}
