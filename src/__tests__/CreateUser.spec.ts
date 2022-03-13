/* eslint-disable no-undef */
import request from 'supertest';
import prisma from '../prisma/Client';
import { app } from '../app';

describe('POST /users/register', () => {
  describe('given a username, email and password', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/users/register').send({
        username: 'Username',
        email: 'username@gmail.com',
        password: 'password',
      });
      expect(response.statusCode).toBe(200);
    });

    test('should specify json in the content type header', async () => {
      const response = await request(app).post('/users/register').send({
        username: 'Username2',
        email: 'username2@gmail.com',
        password: 'password',
      });
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test('must respond with a id', async () => {
      const response = await request(app).post('/users/register').send({
        username: 'Username3',
        email: 'username3@gmail.com',
        password: 'password',
      });
      expect(response.body.id).toBeDefined();
    });
  });

  describe('when the username or the password is missing', () => {
    test('should respond with a 400 status code', async () => {
      const response = await request(app).post('/users/register').send({
        username: '',
        email: 'username@gmail.com',
        password: 'password',
      });

      expect(response.statusCode).toBe(400);
    });

    test('should respond with a error', async () => {
      const response = await request(app).post('/users/register').send({
        username: '',
        email: 'username@gmail.com',
        password: 'password',
      });

      expect(response.body.error).toBe('Missing fields');
    });
  });

  describe('when the user already exists', () => {
    test('should respond with a 400 status code', async () => {
      const response = await request(app).post('/users/register').send({
        username: 'Username3',
        email: 'username3@gmail.com',
        password: 'password',
      });

      expect(response.statusCode).toBe(400);
    });

    test('should respond with a error', async () => {
      const response = await request(app).post('/users/register').send({
        username: 'Username3',
        email: 'username3@gmail.com',
        password: 'password',
      });

      expect(response.body.error).toBe('User already exists');
    });
  });

  afterAll(async () => {
    const usersToDelete = ['Username', 'Username2', 'Username3'];

    await prisma.user.deleteMany({
      where: {
        username: {
          in: usersToDelete,
        },
      },
    });
  });
});
