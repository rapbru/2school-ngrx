import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActionToasterService } from '../services/action-toaster.service';
import { TodoItem } from '../models/todo.types';
import { TodoActions } from '../actions';
import { TodoState } from '../reducers/todo.state';
import { getTodos } from '../reducers/todo.selector';

@Component({
  selector: 'todo-page',
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  public todos$: Observable<TodoItem[]>;

  constructor(
    private store$: Store<TodoState>,
    private actionToaster: ActionToasterService
  ) {
    this.todos$ = this.store$.pipe(select(getTodos));
  }

  public ngOnInit() {
    this.store$.dispatch(TodoActions.load());
    this.actionToaster.start();
  }

  // TODO: Create add event handler which invokes a new action
  public onAdd(newItem: TodoItem) {
    this.store$.dispatch(TodoActions.add({toAdd: newItem}));
  }

  public onReset(): void {
    this.store$.dispatch(TodoActions.reset());
  }

  public onChecked(payload: { id: number; checked: boolean }): void {
    this.store$.dispatch(TodoActions.check(payload));
  }
}
