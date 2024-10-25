const pool = require('../config/dbConfig');

// Function to register a new user
async function registerUser(userData) {
  const { email, name, password } = userData;
  try {
    const result = await pool.query(
      `INSERT INTO users (email, name, password) VALUES (?, ?, ?)`,
      [email, name, password]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser };
