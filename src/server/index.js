import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import path from 'path';
import { configureStore } from '../shared/redux/store';
import App from '../shared/components/App';
import redisService from './services/redis';
import mysqlService from './services/mysql';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

console.log('\n========================================');
console.log('SERVER STARTING...');
console.log('========================================\n');

// API Endpoints
app.get('/api/value', async (req, res) => {
  console.log('\n[EXPRESS] ========================================');
  console.log('[EXPRESS] GET /api/value - Request received');

  try {
    // Step 1: Check Redis cache
    console.log('[EXPRESS] Step 1: Checking Redis cache...');
    let value = await redisService.get('currentValue');

    if (value === null) {
      // Step 2: Cache miss - fetch from MySQL
      console.log('[EXPRESS] Step 2: Cache miss - Fetching from MySQL...');
      value = await mysqlService.getValue('currentValue');

      if (value !== null) {
        // Step 3: Update Redis cache
        console.log('[EXPRESS] Step 3: Updating Redis cache with MySQL value...');
        await redisService.set('currentValue', value);
      } else {
        console.log('[EXPRESS] No value found in MySQL either - returning empty string');
        value = '';
      }
    } else {
      console.log('[EXPRESS] Cache hit! Using Redis value');
    }

    console.log('[EXPRESS] Final value to return:', value);
    console.log('[EXPRESS] Sending response to client');
    console.log('[EXPRESS] ========================================\n');

    res.json({ value });
  } catch (error) {
    console.error('[EXPRESS] Error in GET /api/value:', error);
    console.log('[EXPRESS] ========================================\n');
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/value', async (req, res) => {
  console.log('\n[EXPRESS] ========================================');
  console.log('[EXPRESS] POST /api/value - Request received');
  console.log('[EXPRESS] Request body:', req.body);

  const { value } = req.body;

  try {
    console.log('[EXPRESS] Value to save:', value);

    // Step 1: Save to MySQL (primary storage)
    console.log('[EXPRESS] Step 1: Saving to MySQL...');
    await mysqlService.setValue('currentValue', value);

    // Step 2: Update Redis cache
    console.log('[EXPRESS] Step 2: Updating Redis cache...');
    await redisService.set('currentValue', value);

    console.log('[EXPRESS] Value successfully saved to both MySQL and Redis');
    console.log('[EXPRESS] Sending success response to client');
    console.log('[EXPRESS] ========================================\n');

    res.json({ success: true, value });
  } catch (error) {
    console.error('[EXPRESS] Error in POST /api/value:', error);
    console.log('[EXPRESS] ========================================\n');
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/debug', (req, res) => {
  console.log('\n[EXPRESS] ========================================');
  console.log('[EXPRESS] POST /api/debug - Debug info received from browser');
  console.log('[EXPRESS] Debug Data:', JSON.stringify(req.body, null, 2));
  console.log('[EXPRESS] ========================================\n');
  res.json({ received: true });
});

// SSR Endpoint
app.get('*', async (req, res) => {
  console.log('\n[EXPRESS SSR] ========================================');
  console.log('[EXPRESS SSR] Page request received:', req.url);

  try {
    // Fetch initial value from backend
    console.log('[EXPRESS SSR] Fetching initial value for SSR...');
    let initialValue = await redisService.get('currentValue');

    if (initialValue === null) {
      console.log('[EXPRESS SSR] Redis cache miss - checking MySQL...');
      initialValue = await mysqlService.getValue('currentValue');
      if (initialValue === null) {
        initialValue = '';
      }
    }

    const initialState = {
      value: initialValue,
      loading: false,
      error: null,
      lastUpdated: null
    };

    console.log('[EXPRESS SSR] Initial state for SSR:', initialState);
    console.log('[EXPRESS SSR] Creating Redux store...');

    const store = configureStore(initialState);

    console.log('[EXPRESS SSR] Rendering React app to string...');
    const appHtml = renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );

    console.log('[EXPRESS SSR] React app rendered successfully');
    console.log('[EXPRESS SSR] App HTML length:', appHtml.length, 'characters');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>React Redux Saga SSR App</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
          <div id="root">${appHtml}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            console.log('[SSR] Initial state injected:', window.__INITIAL_STATE__);
          </script>
          <script src="/client.bundle.js"></script>
        </body>
      </html>
    `;

    console.log('[EXPRESS SSR] Sending HTML response to client');
    console.log('[EXPRESS SSR] ========================================\n');

    res.send(html);
  } catch (error) {
    console.error('[EXPRESS SSR] Error during SSR:', error);
    console.log('[EXPRESS SSR] ========================================\n');
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log('\n========================================');
  console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
  console.log('========================================\n');
  console.log('Open your browser to http://localhost:3000');
  console.log('Open browser console (F12) to see frontend logs');
  console.log('Watch this terminal to see backend logs');
  console.log('\nReady to receive requests!\n');
});
