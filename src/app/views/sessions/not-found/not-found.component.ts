import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router) {}

  login() {

    if(this.email === "santander" && this.password === "123"){
      alert("Acceso Correcto");
      this.redirect();
      localStorage.setItem('currentUser', this.email);
    }else{
      alert(" usuario: "+this.email + " incorrecto");
    }
    console.log(this.email);
    console.log(this.password);
  }

  ngOnInit() {
  }

  redirect() {
    this.router.navigate(['dashboard']);
}
}
