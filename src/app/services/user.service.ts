import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../types/user.model";

@Injectable()
export class UserService {
    private readonly getUsersUrl = 'https://jsonplaceholder.typicode.com/users';

    constructor(private http: HttpClient){}

    getUsers() {
        return this.http.get<UserModel[]>(this.getUsersUrl);
    }

}