import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../common/general.service';
import {ActivatedRoute,Router} from '@angular/router';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  currId:any = "-1";
  curr:Object= {};
  userNotes:any = {notes:""};
  constructor(private http:GeneralService,private route:ActivatedRoute,private router:Router,public snackBar: MatSnackBar) { 

    this.route.params.subscribe(params=>{
       this.currId = params['id'];
    })
  }

  ngOnInit() {
    this.http.getData("/ticker/"+this.currId+"/?convert="+localStorage.getItem('coinCap_currName'))
    .subscribe(
      (res)=>{
      this.curr = res.data;
      this.snackBar.open("Data Fetched","",{duration:2000}); 
      },
      error=>{this.snackBar.open("Please Try Again Later")
    });
    let note = JSON.parse(localStorage.getItem("curr_notes"));
    if(note.hasOwnProperty(this.currId)){
      this.userNotes.notes = note[this.currId];
    }
  }
  naviToDashboard(){
    this.router.navigate(['/dashboard']);
  }
  saveNotes(){
    let notes = {};
    notes=JSON.parse(localStorage.getItem("curr_notes"));
    notes[this.currId] = this.userNotes.notes;
    localStorage.setItem("curr_notes",JSON.stringify(notes));
    this.snackBar.open("Note Saved","",{duration:2000});
  }

}
