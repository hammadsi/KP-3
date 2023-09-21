import {AsyncThunk} from '@reduxjs/toolkit';
import {AnyAction} from 'redux';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, {rejectedMeta: Error}>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;

type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

/**
 * Checks if a thunk action is pending
 * @param action thunk action
 * @param reducer the reducer to use
 * @returns true if the state of the thunk action matches pattern '/pending'
 */
export function isPendingAction(
  action: AnyAction,
  reducer: string,
): action is PendingAction {
  return (
    reducer === action.type.split('/')[0] && action.type.endsWith('/pending')
  );
}

/**
 * Checks if a thunk action is rejected
 * @param action thunk action
 * @param reducer the reducer to use
 * @returns true if the state of the thunk action matches pattern '/rejected'
 */
export function isRejectedAction(
  action: AnyAction,
  reducer: string,
): action is RejectedAction {
  return (
    reducer === action.type.split('/')[0] && action.type.endsWith('/rejected')
  );
}

/**
 * Checks if a thunk action is fulfilled
 * @param action thunk action
 * @param reducer the reducer to use
 * @returns true if the state of the thunk action matches pattern '/fulfilled'
 */
export function isFulfilledAction(
  action: AnyAction,
  reducer: string,
): action is FulfilledAction {
  return (
    reducer === action.type.split('/')[0] && action.type.endsWith('/fulfilled')
  );
}
