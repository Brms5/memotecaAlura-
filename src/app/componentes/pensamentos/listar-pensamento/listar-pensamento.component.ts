import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from 'backend/componentes/pensamentos/pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((listaPensamentos: Pensamento[]) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  carregarMaisPensamentos() {
    this.service.listar(this.paginaAtual + 1).subscribe((listaPensamentos: Pensamento[]) => {
      if (listaPensamentos.length > 0) {
        this.listaPensamentos = this.listaPensamentos.concat(listaPensamentos);
        this.paginaAtual++;
      } else {
        this.haMaisPensamentos = false;
      }
    });
  }
}
