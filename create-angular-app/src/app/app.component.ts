import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'create-angular-app';
  countryList : any;
  countryDetails : any;
  selectedContry : any = [];
  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.getCountryList().subscribe(data => {
     console.log(data);
     this.countryList = data;
    });
  }
  ngOnInit() {
  }

  public getCountryList(): Observable<any> {
    return this.http.get('/assets/countries.json');
  }

  public getCountryDetailList(): Observable<any> {
    return this.http.get('/assets/searchResults.json');
  }

  setCountry(value:string){
    console.log("the selected country is " + value);
    this.selectedContry = [];
    this.getCountryDetailList().subscribe(data => {
      data.forEach(element => {
        if(element.country == value) {
          this.selectedContry.push(element)
        }
      });
     });
    
  }

  getSearchList(event, model) {
    if(event instanceof KeyboardEvent) {
    } else {
      console.log(event)
      console.log(event.srcElement.value)
      this.selectedContry.forEach(element => {
        if(element.name == event.srcElement.value) {
          console.log("inside...")
          this.countryDetails = element;
          this.modalService.open(model);
        }
      });
    }
  }

}
