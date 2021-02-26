import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AddressModel } from 'src/app/types/address.model';
import { TodoModel } from 'src/app/types/todo.model';
import { UserModel } from 'src/app/types/user.model';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() userInfo: UserModel | null = null;
  @Input() todos: TodoModel[] | null = null;
  private history: string[] = [];

  constructor(private location: Location, private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)
      }
    })
  }

  back(){
    this.history.pop()
    if (this.history.length > 0) {
      this.location.back()
    } else {
      this.router.navigateByUrl('/')
    }
  }

  get name(): string {
    return this.userInfo?.name;
  }

  get username(): string {
    return this.userInfo?.username;
  }

  get email(): string {
    return this.userInfo?.email;
  }

  get address(): AddressModel {
    return this.userInfo?.address;
  }
  
}
