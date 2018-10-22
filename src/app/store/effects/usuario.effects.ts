import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as usuarioActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';


@Injectable()
export class UsuarioEffects {


    constructor(
        private actions$: Actions,
        public usuarioServices: UsuarioService
    ) { }


    @Effect()
    cargarUsuario$ = this.actions$.ofType(usuarioActions.CARGAR_USUARIO)
        .pipe(
            switchMap(action => {

                const id = action['id'];

                return this.usuarioServices.getUserById(id)
                    .pipe(
                        map(user => new usuarioActions.CargarUsuarioSuccess(user)),
                        catchError(error => of(new usuarioActions.CargarUsuarioFail(error)))
                    );
            })
        );
}


// switchMap recibe un observable lo cancela y regresa otro observable
















