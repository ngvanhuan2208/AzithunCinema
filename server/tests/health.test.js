const { test } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const express = require('express');
const { z } = require('zod');
const createApp = require('../src/app');
const validate = require('../src/middlewares/validate');

test('health distinguishes connected and unavailable database', async () => {
  const ok = await request(createApp(async () => true)).get('/api/health');
  assert.equal(ok.status, 200);
  assert.equal(ok.body.database, 'connected');
  const down = await request(createApp(async () => false)).get('/api/health');
  assert.equal(down.status, 503);
  assert.equal(down.body.database, 'unavailable');
});

test('validate rejects invalid input and exposes parsed values', async () => {
  const app = express();
  app.use(express.json());
  app.post(
    '/',
    validate(z.object({ count: z.coerce.number().positive() })),
    (req, res) => res.json(res.locals.validated.body),
  );
  assert.equal((await request(app).post('/').send({ count: -1 })).status, 400);
  assert.deepEqual((await request(app).post('/').send({ count: '2' })).body, {
    count: 2,
  });
});
