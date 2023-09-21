import { AsyncThunk } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, { rejectedMeta: Error }>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;

type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export function isPendingAction(
  action: AnyAction,
  reducer: string,
): action is PendingAction {
  return (
    reducer === action.type.split('/')[0] && action.type.endsWith('/pending')
  );
}

export function isRejectedAction(
  action: AnyAction,
  reducer: string,
): action is RejectedAction {
  return (
    reducer === action.type.split('/')[0] && action.type.endsWith('/rejected')
  );
}

export function isFulfilledAction(
  action: AnyAction,
  reducer: string,
): action is FulfilledAction {
  return (
    reducer === action.type.split('/')[0] && action.type.endsWith('/fulfilled')
  );
}
