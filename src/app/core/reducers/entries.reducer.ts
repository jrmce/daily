import { EntriesActions, EntriesActionTypes } from 'app/core/actions/entries.actions';
import { Entry } from 'app/core/models/entry';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

export interface State extends EntityState<Entry> { }
export const entriesAdapter = createEntityAdapter<Entry>({
  sortComparer: (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
});
export const initialState = entriesAdapter.getInitialState();

export function reducer(state = initialState, action: EntriesActions): State {
  switch (action.type) {

    case EntriesActionTypes.Added: {
      return entriesAdapter.addOne(action.payload, state);
    }

    default: {
      return state;
    }
  }
}

export const getEntriesState = createFeatureSelector<State>('entries');
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = entriesAdapter.getSelectors(getEntriesState);
