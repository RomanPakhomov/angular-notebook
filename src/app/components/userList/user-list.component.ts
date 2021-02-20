import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSortAlphaDown, faSortAlphaDownAlt, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { GetUsers } from 'src/app/store/actions/user.actions';
import { selectUserList } from 'src/app/store/selectors/user.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users = this.store.pipe(select(selectUserList));
  sortKey: string = 'name';
  sortDown = faSortAlphaDown;
  sortUp = faSortAlphaUp;
  sortIcon = faSortAlphaDown;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new GetUsers);
  }

  getIcon(sortKey: string) {
    console.log('sortKey', sortKey);
    console.log('this.sortKey', this.sortKey);
    this.sortIcon = (sortKey === this.sortKey) ? this.sortUp : this.sortDown;
    console.log(this.sortIcon)
  }

  compareIcon(key: string){
    return key === this.sortKey;
  }

  openUserCard(id: number): void {
    this.router.navigate(['user', id])
  }

  sortList(key: string): void {
    if(this.sortKey === key){
      this.users = this.users.pipe(map((data) => {
        return data.slice().reverse();
      }))
    } else {
      this.users = this.users.pipe(map((data) => {
        return data.slice().sort((a, b) => {
          this.sortKey = key;
          if(a[key] instanceof Object){
            return JSON.stringify(a[key]).localeCompare(JSON.stringify(b[key]));
          }
          return a[key].localeCompare(b[key]);
        })
      }))
    }
  }
}
