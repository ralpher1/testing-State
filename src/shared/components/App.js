import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { updateValueRequest, fetchValueRequest } from '../redux/actions';

const App = () => {
  const dispatch = useDispatch();
  const { value, loading, error, lastUpdated } = useSelector(
    (state) => ({
      value: state.value,
      loading: state.loading,
      error: state.error,
      lastUpdated: state.lastUpdated,
    }),
    shallowEqual
  );

  useEffect(() => {
    console.log('[REACT COMPONENT] App mounted');
    console.log('[REACT COMPONENT] Dispatching fetchValueRequest to load initial value');
    dispatch(fetchValueRequest());
  }, [dispatch]);

  useEffect(() => {
    console.log('[REACT COMPONENT] State changed in App component');
    console.log('[REACT COMPONENT] Current value:', value);
    console.log('[REACT COMPONENT] Loading:', loading);
    console.log('[REACT COMPONENT] Error:', error);
    console.log('[REACT COMPONENT] Last updated:', lastUpdated);
  }, [value, loading, error, lastUpdated]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    console.log('\n[REACT COMPONENT] ================================');
    console.log('[REACT COMPONENT] Input changed');
    console.log('[REACT COMPONENT] New value:', newValue);
    console.log('[REACT COMPONENT] Dispatching updateValueRequest');
    console.log('[REACT COMPONENT] ================================\n');

    dispatch(updateValueRequest(newValue));
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    header: {
      color: '#333',
      borderBottom: '2px solid #007bff',
      paddingBottom: '10px',
      marginBottom: '20px'
    },
    section: {
      backgroundColor: 'white',
      padding: '15px',
      marginBottom: '15px',
      borderRadius: '4px',
      border: '1px solid #ddd'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: 'bold',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      border: '2px solid #007bff',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    display: {
      fontSize: '18px',
      padding: '15px',
      backgroundColor: '#e7f3ff',
      border: '2px solid #007bff',
      borderRadius: '4px',
      minHeight: '50px',
      wordBreak: 'break-word'
    },
    status: {
      fontSize: '14px',
      color: '#666',
      marginTop: '10px'
    },
    debug: {
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '12px',
      fontFamily: 'monospace'
    },
    debugTitle: {
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#007bff'
    },
    debugItem: {
      marginBottom: '5px',
      padding: '5px',
      backgroundColor: 'white',
      borderLeft: '3px solid #007bff'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>React Redux Saga SSR App - State Flow Demo</h1>

      <div style={styles.section}>
        <label style={styles.label}>Enter a value:</label>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Type something to see state flow..."
          style={styles.input}
        />
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Current Value Display:</label>
        <div style={styles.display}>
          {loading ? 'Loading...' : value || '(empty)'}
        </div>
        {error && (
          <div style={{ ...styles.status, color: 'red' }}>
            Error: {error}
          </div>
        )}
        {lastUpdated && (
          <div style={styles.status}>
            Last Updated: {new Date(lastUpdated).toLocaleString()}
          </div>
        )}
      </div>

      <div style={styles.section}>
        <div style={styles.debugTitle}>Redux State Debug Info:</div>
        <div style={styles.debug}>
          <div style={styles.debugItem}>
            <strong>Value:</strong> {value || '(empty)'}
          </div>
          <div style={styles.debugItem}>
            <strong>Loading:</strong> {loading ? 'true' : 'false'}
          </div>
          <div style={styles.debugItem}>
            <strong>Error:</strong> {error || 'null'}
          </div>
          <div style={styles.debugItem}>
            <strong>Last Updated:</strong> {lastUpdated || 'null'}
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.debugTitle}>Instructions:</div>
        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <p><strong>Check the browser console (F12)</strong> to see frontend state flow through:</p>
          <ul>
            <li>React Component events</li>
            <li>Redux Actions being dispatched</li>
            <li>Redux Middleware processing</li>
            <li>Redux Reducer state changes</li>
            <li>Redux Saga API calls</li>
          </ul>
          <p><strong>Check the server console</strong> to see backend state flow through:</p>
          <ul>
            <li>Express API endpoints</li>
            <li>Redis cache operations</li>
            <li>MySQL database queries</li>
            <li>State persistence and retrieval</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
