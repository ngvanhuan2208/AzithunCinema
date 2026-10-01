const mongoose = require('mongoose');

async function connectDatabase(uri) {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
}

async function databaseHealthy() {
  if (mongoose.connection.readyState !== 1) return false;
  try {
    await mongoose.connection.db.admin().ping();
    return true;
  } catch {
    return false;
  }
}

module.exports = { connectDatabase, databaseHealthy };
