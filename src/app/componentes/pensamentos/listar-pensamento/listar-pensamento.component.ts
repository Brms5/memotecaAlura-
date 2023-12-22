import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from 'backend/componentes/pensamentos/pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = "Meu Mural";

  constructor(
    private service: PensamentoService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos: Pensamento[]) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  carregarMaisPensamentos() {
    this.service.listar(this.paginaAtual + 1, this.filtro, this.favoritos).subscribe((listaPensamentos: Pensamento[]) => {
      if (listaPensamentos.length > 0) {
        this.listaPensamentos = this.listaPensamentos.concat(listaPensamentos);
        this.paginaAtual++;
      } else {
        this.haMaisPensamentos = false;
      }
    });
  }

  pesquisarPensamento() {
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos: Pensamento[]) => {
      this.listaPensamentos = listaPensamentos;
      this.haMaisPensamentos = true;
    });
  }

  listarTodosPensamentos() {
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  listarFavoritos() {
    this.titulo = "Meus Favoritos";
    this.favoritos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentosFavoritos: Pensamento[]) => {
      this.listaPensamentos = listaPensamentosFavoritos;
      this.haMaisPensamentos = true;
      this.listaFavoritos = listaPensamentosFavoritos;
    });
  }
}
