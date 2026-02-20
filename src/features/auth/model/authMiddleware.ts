import { createListenerMiddleware } from '@reduxjs/toolkit';
import { persistAuthState } from '../lib';
import type { RootState } from '@/app/store';

export const authListenerMiddleware = createListenerMiddleware();
// TODO: Remove for production useful only for testing auth in complex ERP systems
// Keep for now as a development aid when user switching is frequently needed 
authListenerMiddleware.startListening({
  predicate: (_action, currentState, previousState) => {    
    return (currentState as RootState).auth !== (previousState as RootState).auth;
  },
  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    persistAuthState(state.auth);
  },
});
