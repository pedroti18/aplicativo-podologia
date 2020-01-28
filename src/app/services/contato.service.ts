import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Contato } from '../model/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(
    protected fire: AngularFirestore
    
  ) { }

  save(contato) {
    return this.fire.collection("contato")
      .add({      
        nome: contato.nome,
        telefone: contato.telefone,
        email: contato.email,
        assunto: contato.assunto,
        comentario: contato.comentario
      });
  }

  getAll() {
    return this.fire.collection("contato").snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        )
      )
  }

  get(id) {
    return this.fire.collection("contato").doc<Contato>(id).valueChanges();
  }
}