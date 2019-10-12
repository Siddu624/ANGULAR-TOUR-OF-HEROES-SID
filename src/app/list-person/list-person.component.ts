import { Component, OnInit } from '@angular/core';
import { PersonService } from '../person.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../person';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit {

  persons: Person[];
  constructor(private personService: PersonService) { }
  ngOnInit() {
    this.getPersons();
  }
  getPersons(): void {
    this.personService.getPersons()
        .subscribe(persons => this.persons = persons);
  }
  add(person: Person): void {
    this.personService.addPerson(person)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(person => {
        this.persons.push(person);
      });
  }

  delete(person: Person): void {
    this.persons = this.persons.filter(p => p !== person);
    this.personService.deletePerson(person).subscribe();
  }

}
