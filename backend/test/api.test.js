const request = require('supertest');
const express = require('express');
const app = require('../index'); // export app in index.js if needed

describe('API Tests', () => {
  it('POST /login - valid', async () => {
    const res = await request('http://localhost:4000').post('/login').send({ username: 'admin', password: '1234' });
    expect(res.statusCode).toEqual(200);
  });

  it('POST /login - invalid', async () => {
    const res = await request('http://localhost:4000').post('/login').send({ username: 'user', password: 'wrong' });
    expect(res.statusCode).toEqual(401);
  });

  it('CRUD flow', async () => {
    const item = await request('http://localhost:4000').post('/items').send({ text: 'Test Todo' });
    expect(item.statusCode).toEqual(201);

    const list = await request('http://localhost:4000').get('/items');
    expect(list.body.length).toBeGreaterThan(0);

    const updated = await request('http://localhost:4000').put(`/items/${item.body.id}`).send({ text: 'Updated' });
    expect(updated.body.text).toBe('Updated');

    const del = await request('http://localhost:4000').delete(`/items/${item.body.id}`);
    expect(del.statusCode).toEqual(204);
  });
});
