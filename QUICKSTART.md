# Quick Start Guide

## Running the Application

The app is already built and ready to run!

### Start the server:

```bash
npm start
```

Then open your browser to: **http://localhost:3000**

### What to do:

1. **Open two terminals side by side:**
   - Terminal 1: Run `npm start` (server console)
   - Terminal 2: Keep it open to see server logs

2. **Open browser with DevTools:**
   - Navigate to http://localhost:3000
   - Press F12 to open Developer Console
   - Go to the Console tab

3. **Type in the input box and watch the magic!**

### What you'll see:

#### In the Browser Console (F12):
```
[CLIENT] Client-side JavaScript loaded
[REDUX STORE] Configuring Redux store...
[REDUX SAGA] Root saga initialized
[REACT COMPONENT] App mounted
[REDUX ACTION] updateValueRequest dispatched
[REDUX MIDDLEWARE] Dispatching action
[REDUX REDUCER] Action received: UPDATE_VALUE_REQUEST
[REDUX SAGA] Making API call to /api/value
```

#### In the Server Console (Terminal):
```
[EXPRESS] POST /api/value - Request received
[EXPRESS] Step 1: Saving to MySQL...
[MYSQL] ========== QUERY EXECUTION ==========
[MYSQL] Executing INSERT/UPDATE
[MYSQL] ✓ Successfully saved to database
[REDIS] ========== SET REQUEST ==========
[REDIS] Setting value: "your input"
[REDIS] ✓ Successfully cached value
```

### Complete State Flow Example:

When you type "Hello World" in the input:

1. **Browser**: React detects input change
2. **Redux**: Dispatches UPDATE_VALUE_REQUEST action
3. **Saga**: Intercepts action, makes API call
4. **Express**: Receives POST /api/value
5. **MySQL**: Saves "Hello World" to database
6. **Redis**: Caches "Hello World" for fast retrieval
7. **Express**: Returns success response
8. **Saga**: Dispatches UPDATE_VALUE_SUCCESS
9. **Reducer**: Updates Redux state
10. **React**: Re-renders with new value

All of this is logged in detail in both consoles!

## To rebuild after changes:

```bash
npm run build
npm start
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     BROWSER                             │
│  ┌─────────────┐  ┌──────────┐  ┌─────────────────┐   │
│  │   React     │→ │  Redux   │→ │  Redux Saga     │   │
│  │ Component   │← │  Store   │← │  (API Calls)    │   │
│  └─────────────┘  └──────────┘  └────────┬────────┘   │
└──────────────────────────────────────────│─────────────┘
                                            │
                                     HTTP   │   Axios
                                            ↓
┌─────────────────────────────────────────────────────────┐
│                  EXPRESS SERVER                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  API Endpoints: /api/value, /api/debug          │  │
│  └────────┬───────────────────────────┬─────────────┘  │
│           ↓                           ↓                 │
│  ┌─────────────────┐        ┌──────────────────┐      │
│  │  Redis Service  │        │  MySQL Service   │      │
│  │  (Cache Layer)  │        │  (Persistence)   │      │
│  └─────────────────┘        └──────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

Enjoy exploring the complete state flow!
