/* eslint-disable no-undef */
import request from 'supertest';
import { app } from '../app';
import prisma from '../prisma/Client';

describe('POST /users/login', () => {
  describe('given an email and password', () => {
    const req = {
      username: 'Username',
      email: 'username@gmail.com',
      password: 'pass',
    };

    test('should respond with a 200 status code', async () => {
      const createUser = await request(app).post('/users/register').send(req);

      if (createUser.statusCode === 200) {
        const login = await request(app).post('/users/login').send({
          email: req.email,
          password: req.password,
        });

        expect(login.statusCode).toBe(200);
      } else {
        expect(true).toBe(false);
      }
    });

    test('must respond with a token', async () => {
      const response = await request(app).post('/users/login').send({
        email: req.email,
        password: req.password,
      });

      expect(response.body.token).toBeDefined();
    });
  });

  describe('when the email or the password is wrong', () => {
    const req = {
      username: 'Username',
      email: 'usernam@gmail.com',
      password: 'pass',
    };

    test('should respond with a 400 status code', async () => {
      const response = await request(app).post('/users/login').send({
        email: req.email,
        password: req.password,
      });

      expect(response.statusCode).toBe(400);
    });

    test('should respond with a error', async () => {
      const response = await request(app).post('/users/login').send({
        email: req.email,
        password: req.password,
      });

      expect(response.body.error).toBe('Invalid email or password');
    });
  });

  afterAll(async () => {
    const usersToDelete = ['Username'];

    await prisma.user.deleteMany({
      where: {
        username: {
          in: usersToDelete,
        },
      },
    });
  });
});
