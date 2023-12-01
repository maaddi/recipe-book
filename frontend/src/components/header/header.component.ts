import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorageService} from "../../services/storage.service";
import {MenuItem, SharedModule} from "primeng/api";
import {AvatarModule} from "primeng/avatar";
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {AuthService} from "../../services/auth.service";
import {CreateRecipeComponent} from "../create-recipe/create-recipe.component";
import {DialogService, DynamicDialogModule, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SharedModule, AvatarModule, ButtonModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService]
})
export class HeaderComponent implements OnInit {

  isLoggedIn: Boolean | undefined;
  items: MenuItem[] = [];
  ref?: DynamicDialogRef;

  constructor(private storageService: StorageService, private authService: AuthService, private dialogService: DialogService) { }

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.items = [
      {label: 'Details', routerLink: '/userDetails'},
      {label: 'Logout', command: () => this.logout()}]
  }

  logout(): void {
    const user = JSON.parse(window.sessionStorage.getItem('auth-user')!);
    this.authService.logout(user.id).subscribe({
      next: data => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        //this.errorMessage[0].detail = err.error;
      }
    });
  }

  show() {
    this.ref = this.dialogService.open(CreateRecipeComponent, {header: 'Create a recipe'});
  }
}
