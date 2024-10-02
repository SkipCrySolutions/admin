import { Component } from '@angular/core';
import { OrdersService } from './orders.service';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { TimelineModule } from 'primeng/timeline';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, DataViewModule, TimelineModule, ButtonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  public orders: any = [];
  public layout: 'grid' | 'list' = 'list';
  public events: string[] = [];
  constructor(public orderService: OrdersService) {
    // this.getOrders();
    this.events = [
      "Placed", "Accepted", "Cleaned, Checked & Packed", "Ready for delivery", "Delivered", "Time to Return", "Returned", "Checked & Added Back to Inventory"
    ];
    this.selectTab('placed');
  }

  public selectTab(tab: string) {
    console.log('tab => ', tab);
    this.orderService.selectedTab = tab;
    this.getOrders();
    // switch (tab) {
    //   case 'placed':
    //     this.getOrders('Placed');
    //     break;
    //   case 'accepted':
    //     this.orders = this.orders.filter((order: any) => order.Status === 'Accepted');
    //     break;
    //   case 'cleaned':
    //     this.orders = this.orders.filter((order: any) => order.Status === 'Cleaned, Checked & Packed');
    //     break;
    //   case 'ready':
    //     this.orders = this.orders.filter((order: any) => order.Status === 'Ready for delivery');
    //     break;
    //   case 'delivered':
    //     this.orders = this.orders.filter((order: any) => order.Status === 'Delivered');
    //     break;
    //   case 'return':
    //     this.orders = this.orders.filter((order: any) => order.Status === 'Time to Return');
    //     break;
    //   case 'returned':
    //     this.orders = this.orders.filter((order: any) => order.Status === 'Returned');
    //     break;
    //   case 'checked':
    //     this.orders = this.orders.filter((order: any) => order.Status === 'Checked & Added Back to Inventory');
    //     break;
    //   default:
    //     this.orders = this.orders;
    //     break;
    // }

  }

  private getOrders(): void {
    this.orderService.getOrders().subscribe((orders) => {
      console.log('orders => ', orders);
      this.orders = orders.map((t: any) => {
        t.expanded = false;
        return t;
      });
    });
  }

  public setStatus(order: any) {
    this.orderService.getOrderState(order).subscribe(() => {
      this.selectTab(this.orderService.selectedTab);
    });
  }
}
