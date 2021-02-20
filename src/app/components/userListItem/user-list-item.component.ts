import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from 'src/app/types/user.model';

@Component({
  selector: '[user]',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input() user: UserModel;

  constructor() {
    this.user = {} as UserModel;
  }

  ngOnInit(): void {
  }

  get name(): string {
    return this.user.name; 
  }

  get username(): string {
    return this.user.username;
  }

  get mail(): string {
    return this.user.email;
  }

  get address(): string {
    return `${this.user.address.city} ${this.user.address.street} ${this.user.address.suite}`;
  }

}
