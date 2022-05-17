import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { ViewTotalOferta } from 'app/shared/models/dashboard/ViewTotalOferta';
import { DashboardService } from 'app/shared/services/dashboard.service';
import tinyColor from 'tinycolor2';

@Component({
  selector: 'app-default-dashboard',
  templateUrl: './default-dashboard.component.html',
  styleUrls: ['./default-dashboard.component.scss'],
  animations: egretAnimations
})
export class DefaultDashboardComponent implements OnInit {

  totalesOferta:ViewTotalOferta[]=new Array();

  constructor(
    private dashboardService: DashboardService,private snackBar: MatSnackBar,
    private router: Router,
  ) { 
  }


  ngOnInit() {
    this.loadTotalOffer();
  }

  redirectOferta(opcionSelected:number){
    this.router.navigate([`/catalog/detofertacounter/${opcionSelected}`]);
  };

  loadTotalOffer(){
    
    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:10,selected:false,titulo:"hola",icono:"settings_backup_restore"});
    
    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:10,selected:false,titulo:"hola",icono:"settings_backup_restore"});

    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:10,selected:false,titulo:"hola",icono:"settings_backup_restore"});

    this.totalesOferta.push({id:1,cantidadInicial:5,cantidadfinal:7,color:"#ffffff",
    fechaFinal:"2022-01-01",fechaInicial:"2022-01-01",dias:5,total:10,selected:false,titulo:"hola",icono:"settings_backup_restore"});

   
  }

  useAlerts(message, action, className) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }

 
}
