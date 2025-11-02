// Mock Redis Service with detailed logging

class RedisService {
  constructor() {
    this.cache = {};
    console.log('[REDIS] RedisService initialized');
  }

  async get(key) {
    console.log(`\n[REDIS] ========== GET REQUEST ==========`);
    console.log(`[REDIS] Attempting to retrieve key: "${key}"`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));

    const value = this.cache[key];

    if (value !== undefined) {
      console.log(`[REDIS] ✓ Cache HIT for key: "${key}"`);
      console.log(`[REDIS] Cached value: "${value}"`);
      console.log(`[REDIS] ====================================\n`);
      return value;
    } else {
      console.log(`[REDIS] ✗ Cache MISS for key: "${key}"`);
      console.log(`[REDIS] ====================================\n`);
      return null;
    }
  }

  async set(key, value) {
    console.log(`\n[REDIS] ========== SET REQUEST ==========`);
    console.log(`[REDIS] Setting key: "${key}"`);
    console.log(`[REDIS] Setting value: "${value}"`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));

    this.cache[key] = value;

    console.log(`[REDIS] ✓ Successfully cached value`);
    console.log(`[REDIS] Current cache state:`, this.cache);
    console.log(`[REDIS] ====================================\n`);

    return 'OK';
  }

  async delete(key) {
    console.log(`\n[REDIS] ========== DELETE REQUEST ==========`);
    console.log(`[REDIS] Deleting key: "${key}"`);

    await new Promise(resolve => setTimeout(resolve, 50));

    delete this.cache[key];

    console.log(`[REDIS] ✓ Successfully deleted key`);
    console.log(`[REDIS] Current cache state:`, this.cache);
    console.log(`[REDIS] ====================================\n`);

    return 'OK';
  }
}

module.exports = new RedisService();
