import { SessionOptions, getIronSession } from 'iron-session';

const sessionOptions: SessionOptions = {
  password: process.env.NUXT_SESSION_PASSWORD || 'complex_password_at_least_32_characters_long',
  cookieName: 'session',
  cookieOptions: {
    secure: true,
  },
};

export default defineEventHandler(async (event) => {
  const session: any = await getIronSession(event.node.req, event.node.res, sessionOptions);
  
  if (event.method === 'POST') {
    // Login
    const body = await readBody(event);

    session.credentials = {
      token: body.token,
      refresh: body.refresh_token,
    }

    await session.save();
    return session.credentials

  }

  if (event.method === 'GET') {

    return session.credentials || null;
  }


  if (event.method === 'PATCH') {
    const body = await readBody(event);

    if (!session.credentials) {
      return { success: false, message: 'No active session' };
    }
    
    session.credentials = { token: body.token, refresh: body.refreshToken };
    
    await session.save();
    return session.credentials
  }

  if (event.method === 'DELETE') {
    session.destroy();
    return { success: true };
  }


});
