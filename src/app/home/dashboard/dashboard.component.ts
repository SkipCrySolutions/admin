import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: 'dashboard.component.html',
  imports: [ButtonModule, RouterModule]
})
export class DashboardComponent {

}
