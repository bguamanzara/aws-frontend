import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncuestaService } from 'src/app/_services/encuesta.service.';
import { Encuesta } from 'src/app/_model/Encuesta';
import { SecurityService } from 'src/app/_services/security.service';

@Component({
  selector: 'app-encuesta-edicion',
  templateUrl: './encuesta-edicion.component.html',
  styleUrls: ['./encuesta-edicion.component.css']
})
export class EncuestaEdicionComponent implements OnInit {

  id: number;
  edicion: boolean = false;
  form: FormGroup;
  encuesta: Encuesta;
  titleTolbar: string;
  favoriteSeason: string;
  seasons: string[] = ['Java', 'C#'];

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private encuestaService: EncuestaService,
    public securityService: SecurityService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.securityService.esRoleAdmin()
    this.form = this.builder.group({
      'id': new FormControl(),
      'nombres': new FormControl(''),
      'apellidos': new FormControl('', [Validators.required]),
      'edad': new FormControl(''),
      'lenguaje': new FormControl(''),
      'profesion': new FormControl('')
    });

    this.encuesta = new Encuesta();

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
    });
    if (this.edicion) {
      this.titleTolbar = 'Editar Encuesta';
    } else {
      this.titleTolbar = 'Nuevo Encuesta';
    }
    this.initEncuestaForm();
  }

  initEncuestaForm() {
    if (this.edicion) {
      //cargar la data del servicio hacia el form 
      this.encuestaService.obtenerEncuesta(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'nombres': new FormControl(data.nombres),
          'apellidos': new FormControl(data.apellidos),
          'edad': new FormControl(data.edad),
          'lenguaje': new FormControl(data.lenguaje),
          'profesion': new FormControl(data.profesion)
        });
      });
    }
  }

  saveEncuesta() {
    this.encuesta.id = this.form.value['id'];
    this.encuesta.nombres = this.form.value['nombres'];
    this.encuesta.apellidos = this.form.value['apellidos'];
    this.encuesta.edad = this.form.value['edad'];
    this.encuesta.lenguaje = this.form.value['lenguaje'];
    this.encuesta.profesion = this.form.value['profesion'];
    if (this.edicion) {
      //actualizar
      this.encuestaService.modificar(this.encuesta).subscribe(data => {
        this.encuestaService.obtenerEncuestasPropios(0, 10).subscribe(pacientes => {
          this.encuestaService.encuestaChange.next(pacientes);
          this.encuestaService.mensajeCambio.next('Registro guardado');
        });
      });
    } else {
      //registrar
      this.encuestaService.guardarEncuesta(this.encuesta).subscribe(data => {
        this.encuestaService.obtenerEncuestasPropios(0, 10).subscribe(pacientes => {
          this.encuestaService.encuestaChange.next(pacientes);
          this.encuestaService.mensajeCambio.next('Registro creado');
        });
      });
    }
    if(this.securityService.esRoleAdmin()){
      this.router.navigate(['/encuesta']);
    }else{
      this.initEncuestaForm();
    }
  }

}
