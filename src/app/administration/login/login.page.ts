import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/administration/services/authentication.service';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userEmail: string = "";
  userPassword: string = "";
  remember: boolean = false;

  constructor(private authenticationService: AuthenticationService, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.userEmail = "";
    this.userPassword = "";
  }

  onSubmit(): void {
    this.authenticationService.login(this.userEmail, this.userPassword).subscribe(
      (isSuccess: boolean) => {
        if (isSuccess) {
          console.log(this.authenticationService.redirectUrl)
          this.router.navigate([this.authenticationService.redirectUrl]);
        } else
          this.errorToast("login failed").then();
      }, (error) => {
        this.errorToast(error).then();
      });
  }

  async errorToast(error: any) {
    const toast = await this.toastController.create({ message: error, duration: 2000 });
    toast.present();
  }
}
