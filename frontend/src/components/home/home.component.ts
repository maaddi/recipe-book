import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../../services/user.service";
import {PaginatorModule} from "primeng/paginator";
import {RecipeService} from "../../services/recipe.service";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {ButtonModule} from "primeng/button";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PaginatorModule, CardModule, DividerModule, ButtonModule, TagModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId = 0;
  totalElements = 0;
  size = 0;
  content: any[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    const user = window.sessionStorage.getItem('auth-user');
    if (user) {
      this.userId = JSON.parse(user).id;
    }
    this.recipeService.loadAll(0, 12, this.userId).subscribe({
      next: data => {
        console.log(data);
        this.totalElements = data.totalElements;
        this.size = data.size;
        this.content = data.content;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
