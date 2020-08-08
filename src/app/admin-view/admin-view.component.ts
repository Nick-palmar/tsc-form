import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  adminForm: FormGroup;
  currentDate: Date;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getDate();

    this.adminForm = this.fb.group({
      flagged: [false],
      age: ["any"],
      adminDate: [this.currentDate],
      chosenName: ["", Validators.pattern("^[a-zA-Z ]+$")]
    })


    
  }

  getDate() {
    const year = new Date().getFullYear();
		const month = new Date().getMonth();
    const day = new Date().getDate();
    
    this.currentDate = new Date(year, month, day);

  }

  onApplyChanges() {
    console.log(this.adminForm.value);
    let chosenDate  = this.adminForm.get("adminDate").value;
    let pipe = new DatePipe('en-CA');
    let formattedDate = pipe.transform(chosenDate, 'yyyy/MM/dd');
    console.log(formattedDate);
    console.log("apply, send to java/sql");
  }

  // method to check if an input field has an error
	error(formControlName: string, errorName: string) {
		return this.adminForm.controls[formControlName].hasError(errorName);
	}

  onReset() {

    //reset form for visual purposes
    this.adminForm.reset();
    
    // patch values to avoid errors
    this.adminForm.patchValue({chosenName: ""})
    this.adminForm.patchValue({flagged: false});
    this.adminForm.patchValue({age: "any"});
    this.adminForm.patchValue({adminDate: this.currentDate});

    console.log(this.adminForm.value);
    console.log("reset");
  }

  onCheckboxChange(event) {
    this.adminForm.patchValue({flagged: event.checked});
    console.log(this.adminForm.value);
  }


}
