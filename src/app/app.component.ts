import { Component, OnInit } from '@angular/core';
import { SecurityService } from './_services/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  opened: boolean = false;
  isAdmin: boolean = false;
  
  constructor(
    private serviceSecurity: SecurityService ){
  }

  ngOnInit(){
    setTimeout(() => {
      this.isAdmin = this.serviceSecurity.esRoleAdmin();
    },1500);
  }
}