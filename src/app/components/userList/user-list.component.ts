import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faSort, faSortAlphaDown, faSortAlphaUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { sortFieldId } from 'src/app/constants/sort-fileds.enum';
import { sortVectorId } from 'src/app/constants/sort-vectors.enum';
import { SetNotebookFilter, SetNotebookPage, SetNotebookSortField, SetNotebookSortVector } from 'src/app/store/actions/config.actions';
import { GetUsers } from 'src/app/store/actions/user.actions';
import { selectNotebookConfig } from 'src/app/store/selectors/config.selector';
import { selectUserList } from 'src/app/store/selectors/user.selector';
import { AppState } from 'src/app/store/state/app.state';
import { CompanyModel } from 'src/app/types/company.model';
import { NotebookConfigModel } from 'src/app/types/configuration.model';
import { UserModel } from 'src/app/types/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy{
  users: Observable<UserModel[]>;
  companies: Observable<CompanyModel[]>;
  selectedCompany: FormControl = new FormControl(null);
  selectedCompanySubscription: Subscription = new Subscription();
  notebookConfigs: Observable<NotebookConfigModel>;
  currentFilterSubscription: Subscription;
  p: number = 1;
  sortField: string = sortFieldId.NAME;
  sortVector: string = sortVectorId.ASC;
  sort = faSort;
  sortUp = faSortAlphaUp;
  sortDown = faSortAlphaDown;

  constructor(private store: Store<AppState>, private router: Router) {
    this.users = this.store.pipe(select(selectUserList))
    this.companies = new Observable;
    this.store.dispatch(new GetUsers);
    this.getCompanies();
    this.notebookConfigs = this.store.pipe(select(selectNotebookConfig));
    this.currentFilterSubscription = this.notebookConfigs.subscribe(value => {
      if(value?.currentFilter?.companyName && !this.selectedCompany.value){
        this.selectedCompany.setValue(value.currentFilter.companyName);
        this.filterByCompany(value.currentFilter.companyName);
      }
      if(value?.currentPage){
        this.p = value.currentPage;
      }
      if(value?.currentSort?.sortField && value?.currentSort?.sortVector){
        this.sortList2(value.currentSort.sortField, value.currentSort.sortVector);
      }
    })
    this.selectedCompanySubscription = this.selectedCompany.valueChanges.subscribe(value => {
      this.filterByCompany(value);
      this.store.dispatch(new SetNotebookFilter(value));
    });
  }

  ngOnDestroy(): void {
    this.selectedCompanySubscription.unsubscribe();
    this.currentFilterSubscription.unsubscribe();
  }

  pageChanged(p: number): void {
    this.store.dispatch(new SetNotebookPage(p));
  }

  openUserCard(id: number): void {
    this.router.navigate(['user', id])
  }

  getCompanies(): void {
    this.companies = this.store.pipe(
      select(selectUserList),
      map(users => users.map(user => user.company))
    );
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
    this.store.dispatch(new SetNotebookPage(1));
  }

  removeFilter(): void {
    this.store.dispatch(new SetNotebookFilter(null));
    this.users = this.store.pipe(select(selectUserList));
    this.selectedCompany.reset(null);
  }

  sortIcon(field: string): IconDefinition{
    if(field !== this.sortField){
      return this.sort;
    }
    switch(this.sortVector){
      case sortVectorId.ASC:
        return this.sortDown
      case sortVectorId.DESC:
        return this.sortUp
      default:
        return this.sort
    }
  }

  sortList(field: string): void {
    let sortVector = sortVectorId.ASC
    if(field === this.sortField){
      sortVector = this.sortVector === sortVectorId.ASC ? sortVectorId.DESC : sortVectorId.ASC;
    }
    this.store.dispatch(new SetNotebookSortField(field));
    this.store.dispatch(new SetNotebookSortVector(sortVector));
  }

  sortList2(field: string, vector: string): void {
    this.sortField = field;
    this.sortVector = vector;
    this.users = this.users.pipe(map((data) => {
      const sortedData = data
        .slice()
        .sort((a, b) => {
          if(a[field] instanceof Object){
            return JSON.stringify(a[field]).localeCompare(JSON.stringify(b[field]));
          }
          return a[field].localeCompare(b[field]);
        })
      return vector === sortVectorId.ASC ? sortedData : sortedData.reverse()
    }))
  }
}
