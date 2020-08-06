import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { UserSignService } from '../user-sign.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  userForm: FormGroup;
	submitted = false;
	recaptcha: any[];
	noRecaptcha = true;
	
	minDate: Date;
  maxDate: Date;
  
  constructor(private fb: FormBuilder, private userSignService: UserSignService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
		  formDate: ["", [Validators.required]],
		  name: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z ]+$")]],
		  email: ["", [Validators.required, Validators.email]],
		  role: ["", Validators.required],
		  age: ["", Validators.required],
		  questions: this.fb.group({
			  question1: [false],
			  question2: [false],
			  question3: [false],
			  question4: [false],
			  question5: [false],
			  question6: [false],
			  question7: [false],
			  question8: [false],
			  question9: [false],
			  question10: [false]
		  })
	  })
	  
	  this.getDateBoundaries();
  }

  onCheckboxChange(e, formControlName) {
		this.userForm.get("questions").patchValue({[formControlName]: e.checked});
		console.log(this.userForm.value);
	}
	
	// method to check if an input field has an error
	error(formControlName: string, errorName: string) {
		return this.userForm.controls[formControlName].hasError(errorName);
	}
	
	// method to check if submit button is disabled
	isDisabled() {
		if (this.userForm.invalid || this.noRecaptcha) {
			return true;
		}
		return false;
	}

  
	getDateBoundaries() {
		const year = new Date().getFullYear();
		const month = new Date().getMonth();
		const day = new Date().getDate();

		this.minDate = new Date(year, month, day);
		this.maxDate = new Date(year, month, day+14);
	  
	}
	getFormControlValue(controlName) {
		return this.userForm.get(controlName).value;
	}
	getFormGroupValue(group: string, controlName: string) {
		return this.userForm.controls[group].value.controlName;
	}
	

	resolved(captchaResponse: any[]) {
		this.recaptcha = captchaResponse;
		this.noRecaptcha = false;
		console.log(this.recaptcha);
	}
 
  
	onSubmit() {
		if (this.userForm.valid) {
			
			this.submitted = true;
			console.log("Form Submitted!");
			// get all values from reactive form
			console.log(this.userForm.get("formDate").value);
			let formDate = this.getFormControlValue("formDate");
			let formName = this.getFormControlValue("name");
			let formEmail = this.getFormControlValue("email");
			let formRole = this.getFormControlValue("role");
			let formAge = this.getFormControlValue("age");
			let q1 = this.userForm.controls["questions"].value.question1;
			let q2 = this.userForm.controls["questions"].value.question2;
			let q3 = this.userForm.controls["questions"].value.question3;
			let q4 = this.userForm.controls["questions"].value.question4;
			let q5 = this.userForm.controls["questions"].value.question5;
			let q6 = this.userForm.controls["questions"].value.question6;
			let q7 = this.userForm.controls["questions"].value.question7;
			let q8 = this.userForm.controls["questions"].value.question8;
			let q9 = this.userForm.controls["questions"].value.question9;
			let q10 = this.userForm.controls["questions"].value.question10;
			
			console.log(formDate, formName, formEmail, formRole, formAge, q1, q3, q5, q10);
			
			console.log(this.userForm.value);
			
			
			let pipe = new DatePipe('en-CA');
			let myFormattedDate = pipe.transform(formDate, 'yyyy/MM/dd');
			console.log(myFormattedDate);
			this.userSignService.signup(myFormattedDate, formName, formEmail, formRole, formAge, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
				.subscribe(
					data => console.log("Success", data),
					error => console.error("Error", error)
				);
			
			// reset form
			this.userForm.reset();
		
			// array of all questions in questions fg
			let all_questions = ["question1", "question2", "question3", "question4", "question5", "question6", "question7", "question8", "question9", "question10"];
			// change all checkboxes from null to false
			for (let question of all_questions) {
				this.userForm.get("questions").patchValue({[question]: false});
			}
		}
	
	}

}
