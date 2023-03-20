import { Injectable } from '@angular/core';
import { RightPanelService } from './right-panel.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmenttabService {

  constructor(private service: RightPanelService) { }

  getTodos() {
    return localStorage.getItem('todos');
  }

 
  addTodo(data:any) {
    let todoss =[];
     let todos = localStorage.getItem('todos');
     // Add New TodoService
     todoss.push(data);
     this.service.righttab.push(data);
     // Set New Todos
     localStorage.setItem('todos', JSON.stringify(todoss));
     todoss = [...todoss];
     
  }

  // deleteTodo(todoText) {
  //   let todos = JSON.parse(localStorage.getItem('todos'));

  //   for(let i = 0; i <todos.length; i++) {
  //    if(todos[i].text == todoText) {
  //        todos.splice(i, 1);
  //    }
  // }
  //    // Set New Todos
  //    localStorage.setItem('todos', JSON.stringify(todos));
  // }

  //   updateTodo(oldText, newText){  let todos = JSON.parse(localStorage.getItem('todos'));

  //   for(let i = 0; i <todos.length; i++) {
  //    if(todos[i].text == oldText) {
  //      todos[i].text = newText;
  //    }
  // }
  //    // Set New Todos
  //    localStorage.setItem('todos', JSON.stringify(todos));
  // }

}
