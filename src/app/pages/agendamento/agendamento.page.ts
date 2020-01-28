import { Component, OnInit } from '@angular/core';
import { Agendamento } from '../../model/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {

  protected agendamento: Agendamento = new Agendamento;
  protected id: any = null;

  slideOpts = {
    initiaSlide: 1,
    slidesPerView: 3,
    speed: 400
  };
  

  constructor(
    protected agendamentoService: AgendamentoService,
    protected alertController: AlertController,
    protected activedRoute: ActivatedRoute,
    protected router: Router,
    protected platform: Platform
  ) { }

  ngOnInit() {
    this.id = this.activedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.agendamentoService.get(this.id).subscribe(
        res => {
          this.agendamento = res
        },
        //erro => this.id = null
      )
    }
  }
  onsubmit(form) {
    if (!this.id) {
      this.agendamentoService.save(this.agendamento).then(
        res => {
          form.reset();
          this.agendamento = new Agendamento;
          //console.log("Cadastrado!");
          //this.preview = null
          this.presentAlert("Aviso", "Agendado! Entraremos em contato atráves do telefone.")
          this.router.navigate(['', res.id]);
        },
        erro => {
          console.log("Erro: " + erro);
          this.presentAlert("Erro", "Não foi possivel agendar, entre em contato(21)9999-9999!")
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

  


