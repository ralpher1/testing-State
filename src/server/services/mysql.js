// Mock MySQL Service with detailed logging

class MySQLService {
  constructor() {
    this.database = {
      values: {}
    };
    console.log('[MYSQL] MySQLService initialized');
    console.log('[MYSQL] Database schema created: { values: {} }');
  }

  async query(sql, params = []) {
    console.log(`\n[MYSQL] ========== QUERY EXECUTION ==========`);
    console.log(`[MYSQL] SQL: ${sql}`);
    console.log(`[MYSQL] Params:`, params);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Parse the SQL query (simplified)
    if (sql.includes('SELECT')) {
      const key = params[0];
      console.log(`[MYSQL] Executing SELECT query for key: "${key}"`);

      const value = this.database.values[key];

      if (value !== undefined) {
        console.log(`[MYSQL] ✓ Record FOUND`);
        console.log(`[MYSQL] Result: { key: "${key}", value: "${value}" }`);
        console.log(`[MYSQL] ==========================================\n`);
        return [{ key, value }];
      } else {
        console.log(`[MYSQL] ✗ Record NOT FOUND`);
        console.log(`[MYSQL] ==========================================\n`);
        return [];
      }
    } else if (sql.includes('INSERT') || sql.includes('UPDATE')) {
      const [key, value] = params;
      console.log(`[MYSQL] Executing INSERT/UPDATE for key: "${key}", value: "${value}"`);

      this.database.values[key] = value;

      console.log(`[MYSQL] ✓ Successfully saved to database`);
      console.log(`[MYSQL] Current database state:`, this.database.values);
      console.log(`[MYSQL] ==========================================\n`);

      return { affectedRows: 1 };
    } else if (sql.includes('DELETE')) {
      const key = params[0];
      console.log(`[MYSQL] Executing DELETE for key: "${key}"`);

      delete this.database.values[key];

      console.log(`[MYSQL] ✓ Successfully deleted from database`);
      console.log(`[MYSQL] Current database state:`, this.database.values);
      console.log(`[MYSQL] ==========================================\n`);

      return { affectedRows: 1 };
    }
  }

  async getValue(key) {
    console.log(`\n[MYSQL] >>> Calling getValue("${key}")`);
    const result = await this.query('SELECT value FROM values WHERE key = ?', [key]);

    if (result.length > 0) {
      console.log(`[MYSQL] <<< Returning value: "${result[0].value}"`);
      return result[0].value;
    }

    console.log(`[MYSQL] <<< Returning: null`);
    return null;
  }

  async setValue(key, value) {
    console.log(`\n[MYSQL] >>> Calling setValue("${key}", "${value}")`);
    await this.query('INSERT INTO values (key, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?', [key, value, value]);
    console.log(`[MYSQL] <<< setValue completed successfully`);
    return true;
  }
}

module.exports = new MySQLService();
