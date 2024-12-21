import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterModule, SidebarMenuComponent, UserMenuComponent],
})
export class HeaderComponent {
  constructor() {}
}
