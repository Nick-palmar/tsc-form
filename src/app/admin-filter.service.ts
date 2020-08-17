import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SelectedForm } from './selected-form';

@Injectable({
  providedIn: 'root'
})
export class AdminFilterService {
  private _appUrl = 'https://nicolas-p-app.herokuapp.com/admin';
  constructor(private _http: HttpClient) { }

  getUrl() {
		return this._appUrl;
  }
  
  filter(flagged: boolean, age: String, date, name: String): Observable<SelectedForm[]> {
    const url = this.getUrl() + "?isFlagged=" + flagged + "&age=" + age + "&formDate=" + date + "&searchName=" + name; 
    console.log(url);
    return this._http.get<SelectedForm[]>(url);
  }
}
