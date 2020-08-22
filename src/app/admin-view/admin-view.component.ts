import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AdminFilterService } from '../admin-filter.service';
import { SelectedForm } from '../selected-form';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  adminForm: FormGroup;
  currentDate: Date;
  selectedForms: SelectedForm[];
  // myForms: SelectedForm[];

  // columns for table
  displayedColumns = ['role', 'name', 'age', 'email', 'date', 'flagStatus'];

  constructor(private fb: FormBuilder, private adminFilterService: AdminFilterService) { }

  ngOnInit(): void {
    this.getDate();

    this.adminForm = this.fb.group({
      flagged: [false],
      age: ["any"],
      adminDate: [this.currentDate, Validators.required],
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
    if (this.adminForm.valid) {
      console.log(this.adminForm.value);
      let chosenDate  = this.adminForm.get("adminDate").value;
      let pipe = new DatePipe('en-CA');
      let formattedDate = pipe.transform(chosenDate, 'yyyy/MM/dd');
      console.log(formattedDate);
      let name = this.adminForm.get('chosenName').value;
      let flaggedForm = this.adminForm.get('flagged').value;
      let ageGroup = this.adminForm.get('age').value;
      
      this.adminFilterService.filter(flaggedForm, ageGroup, formattedDate, name).subscribe(
        selectedForms => {this.selectedForms = selectedForms;

                          console.log("selected forms");
                          console.log(this.selectedForms);
        },
        error => console.error("Error", error)
      );
    }
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
