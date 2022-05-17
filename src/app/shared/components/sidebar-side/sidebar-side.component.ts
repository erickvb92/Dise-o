import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit, Input } from "@angular/core";
import { NavigationService } from "../../../shared/services/navigation.service";
import { ThemeService } from "../../services/theme.service";
import { Subscription } from "rxjs";
import { ILayoutConf, LayoutService } from "app/shared/services/layout.service";
import { environment } from './../../../../environments/environment';
import { AutenticacionService } from "../../services/autenticacion.service";
import { Router } from '@angular/router';
import { IMenuItem } from './../../models/i-menu-item';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ViewEmploye } from "app/shared/models/viewEmploye";

@Component({
  selector: "app-sidebar-side",
  templateUrl: "./sidebar-side.component.html"
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  public menuItems: IMenuItem[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  public layoutConf: ILayoutConf;
  public rutaImg: string;
  public host: string;
  public currentUser: ViewEmploye;
  idCurrentUser;

  @Input() usuarioLogeado: ViewEmploye;

  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.idCurrentUser = this.autenticacionService.currentUserValue;
  }

  ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;

    this.menuItems =this.navService.getMenu(this.usuarioLogeado.idPerfil);
    this.hasIconTypeMenuItem = !!this.menuItems.filter(
      item => item.type === "icon"
    ).length;  


   /* this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(
        item => item.type === "icon"
      ).length;
    });*/
   
    this.rutaImg = environment.imgRUL;
    this.host= environment.host;
    this.layoutConf = this.layout.layoutConf;
  }
  
  ngOnChanges(){
    this.getMenu();
  }

  getMenu() {
    this.menuItems =this.navService.getMenu(this.usuarioLogeado.idPerfil);
    this.hasIconTypeMenuItem = !!this.menuItems.filter(
      item => item.type === "icon"
    ).length;  


  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe();
    }
  }

  toggleCollapse() {
    if (
      this.layoutConf.sidebarCompactToggle
    ) {
        this.layout.publishLayoutChange({
        sidebarCompactToggle: false
      });
    } else {
        this.layout.publishLayoutChange({
            // sidebarStyle: "compact",
            sidebarCompactToggle: true
          });
    }
  }

  logOut(){
    this.useAlerts('Sesión Finalizada', ' ', 'success-dialog');
    this.autenticacionService.logout();
    this.router.navigate(['/login']);
  }

  useAlerts(message, action, className){
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: [className]
    });
  }
}
