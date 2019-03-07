import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../models/todo.model';
import { BorrarAllTodoCompletadosAction } from '../todo.actions';
@Component({
    selector: 'app-todo-footer',
    templateUrl: './todo-footer.component.html',
    styles: []
})
export class TodoFooterComponent implements OnInit {
    filtrosValidos: fromFiltro.filtrosValidos[] = [ 'todos', 'completados', 'pendientes' ];
    filtroActual: fromFiltro.filtrosValidos;
    taresPendientes: number;
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.subscribe((state) => {
            this.filtroActual = state.filtro;
            this.contarTaresPendientes(state.todos);
        });
    }

    cambiarFiltro(nuevoFiltro: fromFiltro.filtrosValidos) {
        const accion = new fromFiltro.SetFiltroAction(nuevoFiltro);
        this.store.dispatch(accion);
    }

    contarTaresPendientes(todos: Todo[]) {
        this.taresPendientes = todos.filter((todo) => !todo.completado).length;
    }

    borrarCompletados() {
        const accion = new BorrarAllTodoCompletadosAction();
        this.store.dispatch(accion);
    }
}
