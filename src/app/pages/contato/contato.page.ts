import { Component, OnInit } from '@angular/core';
import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/services/contato.service';
import { AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {

  protected contato: Contato = new Contato;
  protected id: any = null;

  slideOpts = {
    initiaSlide: 1,
    slidesPerView: 3,
    speed: 400
  };
  

  constructor(
    protected contatoService: ContatoService,
    protected alertController: AlertController,
    protected activedRoute: ActivatedRoute,
    protected router: Router,
    protected platform: Platform
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.contatoService.get(this.id).subscribe(
        res => {
          this.contato = res
        },
        //erro => this.id = null
      )
    }
  }

  onsubmit(form) {
    if (!this.id) {
      this.contatoService.save(this.contato).then(
        res => {
          form.reset();
          this.contato = new Contato;
          //console.log("Cadastrado!");
          //this.preview = null
          this.presentAlert("Aviso", "Enviado! Entraremos em contato atráves do telefone.")
          this.router.navigate(['', res.id]);
        },
        erro => {
          console.log("Erro: " + erro);
          this.presentAlert("Erro", "Não foi possivel, entre em contato(21)9999-9999!")
        }
      )
    }
  }
  //Alerts-------------------
  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }
}
