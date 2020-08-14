import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSignService {
	private _appUrl = 'https://nicolas-p-app.herokuapp.com/form';
	constructor(private _http: HttpClient) { }
	
	getUrl() {
		return this._appUrl;
	}
	signup(date, name, email, role, age, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10) {
		const url = this.getUrl(); 
		console.log(url);
		return this._http.post<any>(url, {
			"formDate": date,
			"name": name, 
			"email": email,
			"role": role,
			"age": age,
			"question1": q1, 
			"question2": q2,
			"question3": q3,
			"question4": q4,
			"question5": q5,
			"question6": q6,
			"question7": q7,
			"question8": q8,
			"question9": q9,
			"question10": q10
		});
	}
}
