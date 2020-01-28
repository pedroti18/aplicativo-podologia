import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Cadastro } from '../model/cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(
    protected fire: AngularFirestore
    
  ) { }

  save(cadastro) {
    return this.fire.collection("cadastro")
      .add({
        nome: cadastro.nome,
        telefone: cadastro.telefone,
        email: cadastro.email,
        assunto: cadastro.assunto,
        comentario: cadastro.comentario
      });
  }

  getAll() {
    return this.fire.collection("cadastro").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id) {
    return this.fire.collection("cadastro").doc<Cadastro>(id).valueChanges();
  }
}