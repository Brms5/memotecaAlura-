import { Component, OnInit } from '@angular/core';
import { PensamentoService } from 'backend/componentes/pensamentos/pensamento.service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { minusculoValidator } from './minusculoValidators';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
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
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ]),
      ],
      modelo: ['', Validators.required],
      favorito: [false],
    });
  }

  criarPensamento() {
    if (this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    } else {
      alert('Preencha todos os campos!');
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): String {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
