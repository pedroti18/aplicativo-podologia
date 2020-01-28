import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Agendamento } from '../model/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(
    protected fire: AngularFirestore
    
  ) { }

  save(agendamento) {
    return this.fire.collection("agendamento")
      .add({
        nome: agendamento.nome,
        horario: agendamento.horario,
        procedimento: agendamento.procedimento,
        mensagem: agendamento.mensagem,
        telefone: agendamento.telefone,
        homecare: agendamento.homecare,
        data: agendamento.data
      });
  }

  getAll() {
    return this.fire.collection("agendamento").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id) {
    return this.fire.collection("agendamento").doc<Agendamento>(id).valueChanges();
  }
}