import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonService } from '../person.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
@Component({ templateUrl: 'add-person.component.html' })
export class AddPersonComponent implements OnInit {
  addPersonForm: FormGroup;
  persons: Person[];
  person: Person;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private location: Location) {
   }

  ngOnInit() {
   this.createForm();
  }

  createForm() {
    this.addPersonForm = this.formBuilder.group({
      name: [''],
      email: ['']
    });
  }
  onSubmit() {
    // console.log('addPersonForm' , this.addPersonForm.value);
    this.personService.addPerson(this.addPersonForm.value)
    .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
