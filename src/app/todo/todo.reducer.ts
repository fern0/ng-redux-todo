import * as fromTodo from './todo.actions';
import { Todo } from './models/todo.model';

const todo1 = new Todo('Vencer a thanos');
const todo2 = new Todo('Salvar al mundo');
const todo3 = new Todo('Saltar');
todo2.completado = true;
const estadoInicial: Todo[] = [ todo1, todo2, todo3 ];

export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {
    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [ ...state, todo ]; //clonar el estado actual y agregar un nuevo todo
        case fromTodo.TOGGLE_TODO:
            return state.map((todoEdit) => {
                if (todoEdit.id === action.id) {
                    //todoEdit.completado = true; //no sirve de esta manera por que no podria hacer el seguimiento y no genera un nuevo estado
                    return {
                        //siempre la clave es regresar nuevos estados y no mutar los datos originales
                        ...todoEdit, //clona toda las propiedades del todo, pero sobreescribe las que coloque a continuación
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit; //siempre la clave es regresar nuevos estados y no mutar los datos originales
                }
            }); //map crea un nuevo arreglo y rompe la referencia del state de js
        case fromTodo.EDITAR_TODO:
            return state.map((todoEdit) => {
                //map retorna un nuevo array
                if (todoEdit.id === action.id) {
                    //todoEdit.completado = true; //no sirve de esta manera por que no podria hacer el seguimiento y no genera un nuevo estado
                    return {
                        //siempre hay que regresar un nuevo estado y no mutar los datos del estado
                        ...todoEdit, //clona toda las propiedades del todo, pero sobreescribe las que coloque a continuación
                        texto: action.texto
                    };
                } else {
                    return todoEdit; //siempre hay que regresar un nuevo estado y no mutar los datos del estado
                }
            }); //map cre
        case fromTodo.TOGGLE_ALL_TODO:
            return state.map((todo) => {
                return {
                    //retorna un nuevo todo y romper la referencia que maneja js
                    ...todo,
                    completado: action.completado
                };
            });
        case fromTodo.BORRAR_TODO:
            return state.filter((todoEdit) => todoEdit.id !== action.id); //regresa un nuevo array, todos los elementos cuyo id sea distinto al id que estoy recibiendo y finalmente le regreso el nuevo state de array de todos
        case fromTodo.BORRAR_ALL_TODO:
            return state.filter((todoEdit) => !todoEdit.completado); //regresa un nuevo array, con todos los que no estan completados
        default:
            return state;
    }
}
