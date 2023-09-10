import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-menu-categories',
  templateUrl: './menu-categories.component.html',
  styleUrls: ['./menu-categories.component.scss'],
})
export class MenuCategoriesComponent implements OnInit {
  allMenuItems: any;
  mainCoursesItems: any;
  pagedMainCoursesItems: any;
  appeitizerItems: any;
  beverageItems: any;
  pagedMenuItems: any;
  itemsOfMenu: any[] = [];
  pagedAppeitizerItems: any;
  pagedBeverageItems: any;
  itemsPerPage = 6;

  addedMenuItems: any;

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    this.getItems();
    this.getMenuItems();
  }

  getItems() {
    this._apiService
      .getItemsList()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.allMenuItems = res;
          this.getMainCourses();
          this.getAppeitizerItems();
          this.getBeverageItems();
        },
        error: (error: HttpErrorResponse) => {
          throw error;
        },
      });
  }

  getMenuItems() {
    this._apiService
      .fetchAddedMenuItems()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.addedMenuItems = res;
        },
        error: (error: HttpErrorResponse) => {
          throw error;
        },
      });
  }

  getMainCourses() {
    this.mainCoursesItems = this.allMenuItems.filter(
      (item: any) => item.categoryId === 1
    );
  }

  getAppeitizerItems() {
    this.appeitizerItems = this.allMenuItems.filter(
      (item: any) => item.categoryId === 2
    );
  }

  getBeverageItems() {
    this.beverageItems = this.allMenuItems.filter(
      (item: any) => item.categoryId === 3
    );
  }


  addToMenu(menuItem: any) {
    const item={...menuItem,qty:1,subTotal:menuItem.price}
    const isItemAddedInMenuList = this.addedMenuItems?.some(
      (item: any) => item.id === menuItem.id
    );

    if (isItemAddedInMenuList) {
      alert('Item is already added in Menu List');
      return;
    }

    this.itemsOfMenu.push({ ...menuItem });

    this._apiService.sendAddedMenuItems(this.itemsOfMenu);

    this._apiService
      .addToMenuItems(item)
      .pipe(first())
      .subscribe({
        next: () => {
          this.getMenuItems();
          window.location.reload()
        },
        error: (error: HttpErrorResponse) => {
          throw error;
        },
      });
  }

  onPagedMenuItemsReceived(pagedItems: any[], type: string) {
    // Handle the pagedMenuItems data received from the child component here
    if (type === 'all') {
      this.pagedMenuItems = pagedItems;
    } else if (type === 'appeitizer') {
      this.pagedAppeitizerItems = pagedItems;
    } else if (type === 'beverages') {
      this.pagedBeverageItems = pagedItems;
    } else {
      this.pagedMainCoursesItems = pagedItems;
    }
  }
}
