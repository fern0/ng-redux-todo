import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../models/todo.model';
import { filtrosValidos } from '../../filter/filter.actions';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styles: []
})
export class TodosListComponent implements OnInit {
    todos: Todo[] = [];
    filtro: filtrosValidos;
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.store.subscribe((state) => {
            //state completo de la app o puedo seleccionar una parte del state
            this.todos = state.todos;
            this.filtro = state.filtro;
        });
    }
}
