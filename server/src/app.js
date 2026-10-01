const express = require('express');
const createRoutes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

function createApp(checkDatabase) {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));
  app.use('/api', createRoutes(checkDatabase));
  app.use((req, res) =>
    res
      .status(404)
      .json({
        error: { code: 'NOT_FOUND', message: 'Không tìm thấy đường dẫn.' },
      }),
  );
  app.use(errorHandler);
  return app;
}

module.exports = createApp;
