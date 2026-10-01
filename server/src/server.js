const mongoose = require('mongoose');
const env = require('./config/env');
const { connectDatabase } = require('./config/db');
const createApp = require('./app');

async function start() {
  await connectDatabase(env.MONGODB_URI);
  const server = createApp().listen(env.PORT, () =>
    console.info(`Azithun API: http://localhost:${env.PORT}/api`),
  );
  const shutdown = () =>
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

start().catch(() => {
  console.error(
    'Không kết nối được MongoDB. Kiểm tra MONGODB_URI và Docker Compose.',
  );
  process.exit(1);
});
