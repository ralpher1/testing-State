# React Redux Saga SSR App - State Flow Demo

A full-stack React application with Server-Side Rendering that demonstrates complete state flow visibility from the browser through Redux, Saga, Express, Redis, and MySQL.

## Features

- **React 18** with SSR (Server-Side Rendering)
- **Redux** for state management
- **Redux Saga** for side effects
- **Express** server with API endpoints
- **Webpack** for building client and server bundles
- **Mock Redis** and **Mock MySQL** services
- **Comprehensive logging** at every layer

## State Flow

```
User Input (Browser)
  ↓
React Component
  ↓
Redux Action
  ↓
Redux Middleware (Logger)
  ↓
Redux Reducer
  ↓
Redux Saga
  ↓
API Call (Axios)
  ↓
Express Server
  ↓
Redis Cache (check)
  ↓
MySQL Database (if cache miss)
  ↓
Response back through the stack
```

## Installation & Running

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Application

```bash
npm run build
```

This will create:
- `dist/server.js` - Server bundle
- `dist/public/client.bundle.js` - Client bundle

### 3. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### Quick Start (Build + Run)

```bash
npm run dev
```

## Usage

1. Open your browser to `http://localhost:3000`
2. Open the browser console (F12) to see frontend logs
3. Watch the terminal/server console to see backend logs
4. Type in the input box and watch the state flow through the entire stack!

## What You'll See

### Browser Console (F12)
- React component lifecycle events
- Redux actions being dispatched
- Redux middleware processing
- Redux reducer state changes
- Redux Saga executing API calls
- State updates flowing through the app

### Server Console (Terminal)
- Express server startup
- SSR (Server-Side Rendering) process
- API endpoint hits
- Redis cache operations (get/set)
- MySQL database queries
- Complete data flow from request to response

## Project Structure

```
stateTest/
├── src/
│   ├── client/
│   │   └── index.js              # Client entry point (hydration)
│   ├── server/
│   │   ├── index.js              # Express server with SSR
│   │   └── services/
│   │       ├── redis.js          # Mock Redis service
│   │       └── mysql.js          # Mock MySQL service
│   └── shared/
│       ├── components/
│       │   └── App.js            # Main React component
│       └── redux/
│           ├── actions.js        # Redux actions
│           ├── reducers.js       # Redux reducers
│           ├── sagas.js          # Redux sagas
│           └── store.js          # Redux store configuration
├── webpack.config.js             # Webpack config for client + server
└── package.json
```

## How It Works

### Initial Page Load (SSR)
1. Browser requests page from Express server
2. Server fetches initial value from Redis/MySQL
3. Server creates Redux store with initial state
4. Server renders React app to HTML string
5. Server injects state and sends HTML to browser
6. Client-side JavaScript hydrates the React app

### State Updates
1. User types in input box
2. React component dispatches Redux action
3. Redux middleware logs the action
4. Redux reducer updates state
5. Redux Saga intercepts the action
6. Saga makes API call to Express server
7. Express server updates Redis cache
8. Express server persists to MySQL database
9. Response flows back through Saga
10. Redux state is updated with success action
11. React component re-renders with new state

## Mock Services

### Redis Service
- In-memory cache simulation
- Logs all get/set/delete operations
- Shows cache hits and misses

### MySQL Service
- In-memory database simulation
- Logs all SQL queries
- Shows data persistence operations

Both services include artificial delays to simulate real network latency.

## Debug Information

The app includes extensive logging to help you understand the complete state flow:

- **[CLIENT]** - Client-side app initialization
- **[REACT COMPONENT]** - React component events
- **[REDUX ACTION]** - Action dispatches
- **[REDUX MIDDLEWARE]** - Middleware processing
- **[REDUX REDUCER]** - State changes
- **[REDUX SAGA]** - Saga execution
- **[CLIENT STORE]** - Store subscriptions
- **[EXPRESS]** - API endpoints
- **[EXPRESS SSR]** - Server-side rendering
- **[REDIS]** - Cache operations
- **[MYSQL]** - Database queries

## Next Steps

To integrate real Redis and MySQL:

1. Install real clients:
   ```bash
   npm install redis mysql2
   ```

2. Replace mock services in `src/server/services/` with real implementations

3. Update connection strings and credentials in environment variables

Enjoy exploring the complete state flow!
