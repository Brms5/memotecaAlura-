import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from 'backend/componentes/pensamentos/pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false,
  };

  @Input() listaFavoritos: Pensamento[] = [];

  constructor(
    private service: PensamentoService,
  ) {}

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  ngOnInit(): void {}

  mudarIconeFavorito(): string {
    if (this.pensamento.favorito) {
      return 'check';
    } else {
      return 'unchecked';
    }
  }

  atualizarFavoritos(): void {
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1);
    });
  }
}
