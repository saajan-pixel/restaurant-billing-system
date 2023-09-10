import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  itemsPerPage: number = 16;
  menuItems: any;
  pagedMenuItems:any
  form!:FormGroup
  total=0

  constructor(private _apiService: ApiService) {}

  ngOnInit(): void {
    // this._apiService.addedMenuItems$.subscribe(res=>{
    //   this.menuItems=res
    // })
    this.getMenuItems();
  }

  createForm(item:any={}) {
    this.form = new FormGroup({
      arr: new FormArray([
        new FormGroup({
          qty:new FormControl(item.qty),
          subTotal: new FormControl(`Rs ${item.subTotal}`) // Provide an initial value here if needed
        })
      ])
    });
  }

  get arr(){
    return this.form.get('arr') as FormArray
  }
  

  getMenuItems() {
    this._apiService
      .fetchAddedMenuItems()
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.menuItems = res;
          res.map((item:any)=>{
            this.createForm(item)
          })
     
        },
        error: (error: HttpErrorResponse) => {
          throw error;
        },
      });
  }

  onPagedMenuItemsReceived(pagedItems: any[]) {
    // Handle the pagedMenuItems data received from the child component here
    this.pagedMenuItems=pagedItems
  }

  calculateSubtotal(data:any,index: number) {
    console.log(data)
    const subTotal= data.qty * data.price; // Calculate the sub-total
    console.log(subTotal)
    this.arr.at(index).get('subTotal')?.setValue('Rs' +' ' + subTotal.toLocaleString())
  }
}
