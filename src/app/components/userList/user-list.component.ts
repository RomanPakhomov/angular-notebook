import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faSort, faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetUsers } from 'src/app/store/actions/user.actions';
import { selectUserList } from 'src/app/store/selectors/user.selector';
import { AppState } from 'src/app/store/state/app.state';
import { AddressModel } from 'src/app/types/address.model';
import { CompanyModel } from 'src/app/types/company.model';
import { UserModel } from 'src/app/types/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: Observable<UserModel[]>;
  companies: Observable<CompanyModel[]>;
  selectedCompany: FormControl = new FormControl(null);
  p: number = 1;
  sortKey: string = 'name';
  sort = faSort;

  constructor(private store: Store<AppState>, private router: Router) {
    this.users = this.store.pipe(select(selectUserList))
    this.companies = new Observable;
    this.store.dispatch(new GetUsers);
    this.getCompanies();
    this.selectedCompany.valueChanges.subscribe(value => this.filterByCompany(value));
  }

  ngOnInit(): void {}

  openUserCard(id: number): void {
    this.router.navigate(['user', id])
  }

  getCompanies(): void {
    this.companies = this.store.pipe(
      select(selectUserList),
      map(users => users.map(user => user.company))
    );
  }

  createUserAddress(address: AddressModel): string {
    return `${address.city}, ${address.street}, ${address.suite}`;
  }

  filterByCompany(selectedCompany: string): void {
    if(selectedCompany === null){
      this.users = this.store.pipe(select(selectUserList));
    } else {
      this.users = this.store.pipe(
        select(selectUserList),
        map(users => users.filter(user => user.company.name === selectedCompany))
      );
    }
    this.p = 1;
  }

  removeFilter(): void {
    this.users = this.store.pipe(select(selectUserList));
    this.selectedCompany.reset(null);
  }

  sortList(key: string): void {
    if(this.sortKey === key){
      this.users = this.users.pipe(map((data) => {
        return data.slice().reverse();
      }))
      this.sortKey = key + '-reverse';
    } else {
      this.users = this.users.pipe(map((data) => {
        this.sortKey = key;
        return data.slice().sort((a, b) => {
          if(a[key] instanceof Object){
            return JSON.stringify(a[key]).localeCompare(JSON.stringify(b[key]));
          }
          return a[key].localeCompare(b[key]);
        })
      }))
    }
  }
}
