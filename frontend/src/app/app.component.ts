import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {CardModule} from "primeng/card";
import {EventBusService} from "../services/event-bus.service";
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";
import {StorageService} from "../services/storage.service";
import {HeaderComponent} from "../components/header/header.component";

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, CardModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  eventBusSub?: Subscription;

  constructor(private authService: AuthService, private storageService: StorageService, private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    const user = sessionStorage.getItem(USER_KEY);
    this.authService.logout(JSON.parse(user!).id).subscribe({
      next: () => {
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
