import { Component, OnInit, ViewChild } from '@angular/core';
import { GeneralService } from '../common/general.service';
import {Router} from'@angular/router'
import {Song} from '../models/song';
import { MatRadioChange,MatSnackBar } from '@angular/material';
// npm install @webcomponents/webcomponentsjs
export interface Food {
  value: string;
  viewValue: string;
}

@ViewChild('search') 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  songs:Song[];
  song_results:Song[];
  filter_name:String ="INR";
  someRange:Number[] = [0,1];
  searchTerm:String = "";  
  rangeFilter:Boolean = false;
  currencies_results:any;
  curr_present:any ="INR";
  date:any; 
  currType = "$";
  userNotes:any = {};
  someValue:Object = {"value":null};
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  displayedColumns: string[] = ['symbol','name','price','m_cap','notes'];
  constructor(private http:GeneralService,private router:Router,public snackBar: MatSnackBar) { 
    this.date = new Date();
  }

  ngOnInit() {
    if(!localStorage.getItem("curr_notes")){
      localStorage.setItem("curr_notes",JSON.stringify(this.userNotes));
    }
    else{
      this.userNotes.notes = JSON.parse(localStorage.getItem("curr_notes")); 
    }
    if(localStorage.getItem('coinCap_currName')){
      this.filter_name = localStorage.getItem('coinCap_currName');
      this.getData();
    }
    else{
      this.http.getData("/ticker/?convert="+this.filter_name+"&limit=20")
      .subscribe((res)=>{
        let result = Object.keys(res.data).map(function(key) {
          return res.data[key];
        });
        this.currencies_results = result;
        this.snackbarPopup("Data Fetched");
      },
      error =>this.snackbarPopup("Please Try Again After Some Time"))
   };
  }
  
  snackbarPopup(message:string){
    this.snackBar.open(message,"",{
      duration:2000
    });
  }

  changeFilter($event:MatRadioChange){
    this.filter_name = $event.value;
    localStorage.setItem('coinCap_currName',$event.value);
    this.getCurr($event.value);
  }

  getData(){
    this.http.getData("/ticker/?convert="+this.filter_name+"&limit=20")
    .subscribe((res)=>{
      let result = Object.keys(res.data).map(function(key) {
        return res.data[key];
      });
      console.log(this.curr_present);
      this.curr_present = this.filter_name;
      if(this.filter_name == "USD") this.currType = "$";
      else if(this.filter_name == "INR") this.currType = "₹";
      else if(this.filter_name == "EUR") this.currType = "€";
      this.currencies_results = result;
      console.log(this.currencies_results);
      this.snackbarPopup("Data Fetched");
    },
    (error)=>{
      this.snackbarPopup("Please Try Again after some Time");
    });
  }

  getCurr(curr_name){
    this.http.getData("/ticker/?convert="+curr_name+"&limit=20")
    .subscribe(
      (res)=>{
      let result = Object.keys(res.data).map(function(key) {
        return res.data[key];
      });
      this.curr_present = this.filter_name;
      if(this.filter_name == "USD") this.currType = "$";
      else if(this.filter_name == "INR") this.currType = "₹";
      else if(this.filter_name == "EUR") this.currType = "€";
      this.currencies_results = result;
      this.snackbarPopup("Data Fetched");
      },
      error =>{
        this.snackbarPopup("Please Try Again after some Time");
      });
  }


  getSpecificCurr(e:any){
    console.log(e);
    this.router.navigate(['/currency/'+e]);
  }

  saveNotes(id){
    localStorage.setItem("cuur_"+id+"_notes",this.userNotes.notes);
  }
}