import { SessionOptions, getIronSession } from 'iron-session';

const sessionOptions: SessionOptions = {
  password: process.env.NUXT_SESSION_PASSWORD!,
  cookieName: 'session',
  cookieOptions: {
    secure: false,
  },
};

export default defineEventHandler(async (event) => {
  const session: any = await getIronSession(event.node.req, event.node.res, sessionOptions);

  if (event.method === 'POST') {
    const body = await readBody(event);

    session.credentials = {
      accessToken: body.access_token,
      expiresIn: body.expires_in,
      idToken: body.id_token,
      refreshToken: body.refresh_token,
    }

    await session.save();
    return session.credentials
  }

  if (event.method === 'GET') {
    return session.credentials || null;
  }

  if (event.method === 'DELETE') {
    session.destroy();
    return { success: true };
  }

});
