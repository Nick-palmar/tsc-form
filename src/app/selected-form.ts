import { routingComponents } from './app-routing.module';

export class SelectedForm {
    name: string;
    formDate; // form date is of type java.sql.Date
    ageGroup: string;
    email: string;
	role: string;
	question1: boolean;
	question2: boolean;
	question3: boolean;
	question4: boolean;
	question5: boolean;
	question6: boolean;
	question7: boolean;
	question8: boolean;
	question9: boolean;
    question10: boolean;
    flagged: boolean;

    // to specify attribute names
    constructor(name, formDate, ageGroup, email, role, flagged) {
        this.name = name;
        this.formDate = formDate;
        this.ageGroup = ageGroup;
        this.email = email;
        this.role = role;
        this.flagged = flagged;
    }
}
