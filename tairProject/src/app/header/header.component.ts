import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbNavConfig, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../user/component/login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbNavModule,RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css', 
   providers: [NgbNavConfig]
})
export class HeaderComponent {


  constructor(config: NgbNavConfig) {
		config.destroyOnHide = false;
		config.roles = false;
	}
}

