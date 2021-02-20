import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../types/user.model";
import { TodoModel } from "../types/todo.model";

@Injectable()
export class UserService {
    private readonly getUsersUrl = 'https://jsonplaceholder.typicode.com/users';
    private readonly getUserUrl = 'https://jsonplaceholder.typicode.com/users/?id=';
    private readonly getUserTodosUrl = 'https://jsonplaceholder.typicode.com/todos?userId=';

    constructor(private http: HttpClient){}

    getUsers() {
        return this.http.get<UserModel[]>(this.getUsersUrl);
    }

    getUser(id: number) {
        return this.http.get<UserModel[]>(this.getUserUrl + id);
    }

    getUserTodos(id: number) {
        return this.http.get<TodoModel[]>(this.getUserTodosUrl + id);
    }

}