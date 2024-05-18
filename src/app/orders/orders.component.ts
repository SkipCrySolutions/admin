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
  constructor(private orderService: OrdersService) {
    this.getOrders();
    this.events = [
      "Placed", "Accepted", "Cleaned, Checked & Packed", "Ready for delivery", "Delivered", "Time to Return", "Returned", "Checked & Added Back to Inventory"
    ];
  }

  private getOrders(): void {
    this.orderService.getAllOrders().subscribe((orders) => {
      console.log('orders => ', orders);
      this.orders = orders.map((t: any) => {
        t.expanded = false;
        return t;
      });
    });
  }

  public setStatus(orderId: string) {
    this.orderService.getOrderState(orderId).subscribe(() => {
      this.getOrders();
    });
  }
}
