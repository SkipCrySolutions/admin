import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Store } from "./store.model";
import { Router } from "@angular/router";
import { StoreService } from "./store.service";

@Component({
  selector: 'app-stores',
  templateUrl: 'stores.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class StoresComponent {

  public stores: Store[] = [];

  constructor(private router: Router, private storeService: StoreService) {
    this.getStores();
  }

  private getStores(): void {
    this.storeService.getStores().subscribe((resp: Store[]) => {
      this.stores = resp;
      console.log('stores => ', this.stores);
    });
  }

  public editStore(store: Store) {
    this.router.navigate(['store', 'form', store.StoreId]);
  }

}
