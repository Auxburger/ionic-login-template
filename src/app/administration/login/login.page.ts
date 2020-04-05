import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/administration/services/authentication.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userEmail: string = "";
  userPassword: string = "";
  remember: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, public navCtrl: NavController) { }

  ngOnInit() {
    console.log("test")
    this.userEmail = "";
    this.userPassword = "";
    console.log("test");
  }

  onSubmit(): void {
    this.authenticationService.login(this.userEmail, this.userPassword).subscribe((isSuccess) => {
      if (isSuccess) {
        this.navCtrl.navigateRoot(['/']);
      }
    });
    console.log(this.userEmail + this.userPassword)
  }
}
