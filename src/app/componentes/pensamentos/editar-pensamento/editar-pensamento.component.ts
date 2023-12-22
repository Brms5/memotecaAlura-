import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from 'backend/componentes/pensamentos/pensamento.service';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent implements OnInit {
  formulario!: FormGroup;
  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false,
  };

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      autoria: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      modelo: [this.pensamento.modelo, Validators.required],
      favorito: [this.pensamento.favorito],
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento;
    });
  }

  editarPensamento() {
    this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamento']);
    });
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): String {
    if (this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }
}
