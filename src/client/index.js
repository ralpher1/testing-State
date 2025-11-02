import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '../shared/redux/store';
import App from '../shared/components/App';

console.log('\n========================================');
console.log('[CLIENT] Client-side JavaScript loaded');
console.log('========================================\n');

// Get initial state from SSR
const initialState = window.__INITIAL_STATE__ || {};

console.log('[CLIENT] Initial state from SSR:', initialState);

// Configure store with initial state
console.log('[CLIENT] Configuring Redux store on client...');
const store = configureStore(initialState);

console.log('[CLIENT] Store configured successfully');
console.log('[CLIENT] Current store state:', store.getState());

// Subscribe to store changes
store.subscribe(() => {
  const state = store.getState();
  console.log('\n[CLIENT STORE] ========================================');
  console.log('[CLIENT STORE] State changed!');
  console.log('[CLIENT STORE] New state:', state);
  console.log('[CLIENT STORE] ========================================\n');
});

console.log('[CLIENT] Hydrating React app...');

const rootElement = document.getElementById('root');

hydrateRoot(
  rootElement,
  <Provider store={store}>
    <App />
  </Provider>
);

console.log('[CLIENT] React app hydrated successfully');
console.log('[CLIENT] App is now interactive!');
console.log('\n========================================');
console.log('[CLIENT] Ready to accept user input');
console.log('========================================\n');
