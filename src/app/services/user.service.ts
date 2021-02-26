import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../types/user.model";
import { TodoModel } from "../types/todo.model";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
    private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

    constructor(private http: HttpClient){}

    getUsers(): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${this.apiUrl}/users`);
    }

    getUser(id: number): Observable<UserModel[]> {
        return this.http.get<UserModel[]>(`${this.apiUrl}/users/?id=${id}`);
    }

    getUserTodos(id: number): Observable<TodoModel[]> {
        return this.http.get<TodoModel[]>(`${this.apiUrl}/todos?userId=${id}`);
    }

}