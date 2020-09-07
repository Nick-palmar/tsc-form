import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSignService {
	private _appUrl = 'https://nicolas-p-app.herokuapp.com/submit';
	constructor(private _http: HttpClient) { }
	
	getUrl() {
		return this._appUrl;
	}
	signup(formDate, name, email, role, ageGroup, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10) {
		const url = this.getUrl(); 
		console.log(url);
		return this._http.post<any>(url, {
			"formDate": formDate,
			"name": name, 
			"email": email,
			"role": role,
			"age": ageGroup,
			"question1": question1, 
			"question2": question2,
			"question3": question3,
			"question4": question4,
			"question5": question5,
			"question6": question6,
			"question7": question7,
			"question8": question8,
			"question9": question9,
			"question10": question10
		});
	}
}
