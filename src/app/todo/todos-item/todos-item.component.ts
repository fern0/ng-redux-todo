import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
    selector: 'app-todos-item',
    templateUrl: './todos-item.component.html',
    styles: []
})
export class TodosItemComponent implements OnInit {
    @Input() todo: Todo;
    @ViewChild('txtInputFisico') txtInputFisico: ElementRef;
    chkField: FormControl;
    txtInput: FormControl;
    editando: boolean;
    constructor(private store: Store<AppState>) {}

    ngOnInit() {
        this.chkField = new FormControl(this.todo.completado);
        this.txtInput = new FormControl(this.todo.texto, Validators.required);
        console.log(this.todo);
        this.chkField.valueChanges.subscribe((valor) => {
            console.log(valor);
            const accion = new ToggleTodoAction(this.todo.id);
            this.store.dispatch(accion);
        });
    }

    editar() {
        this.editando = true;
        setTimeout(() => {
            this.txtInputFisico.nativeElement.select(); //lo hace muy rapido antes de que se realice la accion de edicion por eso se le da 1 ms de espera
        }, 1);
    }

    terminarEdicion() {
        this.editando = false;
        console.log(this.txtInput.valid);
        //no hago nada si el valor es invalido
        if (this.txtInput.invalid) {
            return;
        }
        //no hago nada si el valor es el mismo
        if (this.txtInput.value === this.todo.texto) {
            return;
        }

        const accion = new EditarTodoAction(this.todo.id, this.txtInput.value); //->este es el campo del form
        this.store.dispatch(accion);
    }

    borrarTodo() {
        const accion = new BorrarTodoAction(this.todo.id);
        this.store.dispatch(accion);
    }
}
