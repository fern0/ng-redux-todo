import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/models/todo.model';
import { filtrosValidos } from './filter.actions';

@Pipe({
    name: 'filterTodo'
})
export class FilterPipe implements PipeTransform {
    transform(todos: Todo[], filtro: filtrosValidos): Todo[] {
        console.log(todos);
        console.log(filtro);
        switch (filtro) {
            case 'completados':
                return todos.filter((todo) => todo.completado);
            case 'pendientes':
                return todos.filter((todo) => !todo.completado);
            default:
                return todos;
        }
    }
}
