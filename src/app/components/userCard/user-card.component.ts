import { Component, Input, OnInit } from '@angular/core';
import { TodoModel } from 'src/app/types/todo.model';
import { UserModel } from 'src/app/types/user.model';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() userInfo: UserModel | null = null;
  @Input() todos: TodoModel[] | null = null;

  constructor() {}

  ngOnInit(): void {
  }

  get name() {
    return this.userInfo?.name;
  }

  get username() {
    return this.userInfo?.username;
  }

  get email() {
    return this.userInfo?.email;
  }

  get address() {
    const address = this.userInfo?.address;
    return address ? `${address?.city} ${address?.street} ${address?.suite}` : '';
  }
  
}
