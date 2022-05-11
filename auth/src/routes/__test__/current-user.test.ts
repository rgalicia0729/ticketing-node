import request from 'supertest';
import { app } from '../../app';

describe('GET /api/users/currentuser', () => {
  it('Responds with details about the current user', async () => {
    const email = 'test@test.com';
    const password = 'password';

    const cookie = await global.signup(email, password);

    const response = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual(email);
  });

  it('Responds with null if not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200);

    expect(response.body.currentUser).toEqual(null);
  });
});