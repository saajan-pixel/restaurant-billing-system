import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private cachedData$!: Observable<any>;
  apiUrl=" http://localhost:3000"

  private addedMenuItemCountSubject = new BehaviorSubject<any>(null);
  addedMenuItems$ = this.addedMenuItemCountSubject.asObservable();

  constructor(private http:HttpClient) { }

  getItemsList(){
    if (!this.cachedData$) {
      // If data is not cached, make the API call and cache the result using shareReplay
      this.cachedData$ = this.http.get<any>(`${this.apiUrl}/items`).pipe(
        catchError((error) => {
          console.error('API call failed', error);
          return [];
        }),
        shareReplay(1) // Cache the result and replay it to new subscribers
      );
    }

    return this.cachedData$;
    return this.http.get<any>(`${this.apiUrl}/items`)
  }

  getMenuCategories(){
    return this.http.get<any>(`${this.apiUrl}/menuCategory`)
  }

  addToMenuItems(data:any){
    return this.http.post<any>(`${this.apiUrl}/menuItems`,data)
  }

  fetchAddedMenuItems(){
    return this.http.get<any>(`${this.apiUrl}/menuItems`)
  }

  sendAddedMenuItems(items:any[]){
    this.addedMenuItemCountSubject.next(items)
  }
}
