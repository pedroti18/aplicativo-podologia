import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MensagemService } from 'src/app/services/mensagem.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  protected email: string = "";
  protected pws: string = "";

  constructor(
    protected afAuth: AngularFireAuth,
    protected msg: MensagemService,
    protected router: Router,
    private device: Device,
    private googlePlus: GooglePlus,

  ) { }

  ngOnInit() {
  }

  onsubmit(form) {
    this.login();
  }

  login() {
    this.msg.presentLoading();
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res => {
        console.log(res.user);
        this.msg.dismissLoading();
        this.router.navigate(['/'])
      },
      erro => {
        console.log("Erro: " + erro);
        this.msg.presentAlert("Erro!", "E-mail ou senha invalidos!");
        this.msg.dismissLoading();
      }
    ).catch(erro => {
      console.log("Erro no sistema: " + erro);
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  loginGoogle() {
    console.log('Device is: ', this.device.platform);
    if (this.device.platform == "browser") {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
        res => {
          console.log(res);
          this.router.navigate(['/'])
        },
        erro => {
          console.log("Erro: ", erro);
          this.msg.presentAlert("Erro!", "Login invalido!");
        }
      )
    } else {
      this.loginGooglePlus();
    }
  }

  loginGooglePlus() {
    this.googlePlus.login({})
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

}