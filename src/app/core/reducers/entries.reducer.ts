import { EntriesActions, EntriesActionTypes } from 'app/core/actions/entries.actions';
import { Entry } from 'app/core/models/entry';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DateTime } from 'luxon';

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

    case EntriesActionTypes.Modified: {
      if (action.payload.id != null) {
        return entriesAdapter.updateOne({
          id: action.payload.id,
          changes: action.payload
        }, state);
      }

      return state;
    }

    case EntriesActionTypes.Removed: {
      if (action.payload.id != null) {
        return entriesAdapter.removeOne(action.payload.id, state);
      }

      return state;
    }

    case EntriesActionTypes.Upsert: {
      if (action.payload.id != null) {
        return entriesAdapter.upsertOne({
          id: action.payload.id,
          changes: action.payload
        }, state);
      }

      return state;
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
export const getToday = createSelector(
  selectAll,
  (entries) => {
    const now = DateTime.local();
    const today = entries.find(entry => {
      const entryTime = DateTime.fromISO(entry.createdAt);
      return entryTime.hasSame(now, 'day');
    });

    if (today != null) {
      return today;
    }

    return null;
  }
);
