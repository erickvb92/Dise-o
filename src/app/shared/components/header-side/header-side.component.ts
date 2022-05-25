import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { AutenticacionService } from "../../services/autenticacion.service";
import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ViewEmploye } from 'app/shared/models/viewEmploye';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  public availableLangs = [{
    name: 'ES',
    code: 'es',
    flag: 'flag-icon-es'
  }, {
    name: 'EN',
    code: 'en',
    flag: 'flag-icon-us'
  }]
  currentLang = this.availableLangs[0];

  @Input() usuarioLogeado: ViewEmploye;
  public rutaImg: string;
  public host: string;
  idCurrentUser;

  public egretThemes;
  public layoutConf:any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    private autenticacionService: AutenticacionService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.idCurrentUser = this.autenticacionService.currentUserValue;
  }
  ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
    this.rutaImg = environment.imgRUL;
    this.host= environment.host;
  }
  setLang(lng) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }
  changeTheme(theme) {
    // this.themeService.changeTheme(theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if(this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if(this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
        sidebarCompactToggle: false
      }, {transitionClass: true})
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact',
      sidebarCompactToggle: true
    }, {transitionClass: true})

  }

  onSearch(e) {
    //   console.log(e)
  }

  logOut(){
    localStorage.removeItem('currentUser');
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