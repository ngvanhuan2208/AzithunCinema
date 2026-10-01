const { Router } = require('express');
const { databaseHealthy } = require('../config/db');

function createRoutes(checkDatabase = databaseHealthy) {
  const router = Router();
  router.get('/health', async (req, res) => {
    const healthy = await checkDatabase();
    res
      .status(healthy ? 200 : 503)
      .json({
        status: healthy ? 'ok' : 'degraded',
        server: 'ok',
        database: healthy ? 'connected' : 'unavailable',
      });
  });
  return router;
}

module.exports = createRoutes;
