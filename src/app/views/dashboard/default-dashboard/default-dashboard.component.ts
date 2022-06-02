import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ViewTotalOferta } from 'app/shared/models/dashboard/ViewTotalOferta';
import { DashboardService } from 'app/shared/services/dashboard.service';
import tinyColor from 'tinycolor2';
import * as Chart from 'chart.js'

@Component({
  selector: 'app-default-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.scss'],
  animations: egretAnimations
})
export class DefaultDashboardComponent implements OnInit {

  totalesOferta:ViewTotalOferta[]=new Array();
  user = localStorage.getItem('currentUser');

  constructor(
    private dashboardService: DashboardService,private snackBar: MatSnackBar,
    private router: Router,
  ) { 
  }


  ngOnInit() {
   if(this.user !== "santander"){
      this.redirectLogin();
   }
    this.loadTotalOffer();
  }

  redirectLogin(){
    this.router.navigate(['/login']);
  }

  redirectOferta(opcionSelected:number){
    this.router.navigate([`/catalog/detofertacounter/${opcionSelected}`]);
  };

  loadTotalOffer(){
    
   
    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:1000,selected:false,titulo:"Total Operacion guardadas",icono:"settings_backup_restore"});
    
    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:1000,selected:false,titulo:"Total Operacion Pendientes",icono:"settings_backup_restore"});

    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:1000,selected:false,titulo:"Total Operacion Aceptadas",icono:"settings_backup_restore"});

    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:1000,selected:false,titulo:"Total Operacion Rechazadas",icono:"settings_backup_restore"});

   
  }

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

  title = 'angular8chartjs';
  canvas: any;
  ctx: any;
  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["New", "In Progress", "On Hold"],
          datasets: [{
              label: '# of Votes',
              data: [1,2,3],
              backgroundColor: [
                  'rgba(255, 0, 0, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
  }
  
}
