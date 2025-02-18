import { withQuery } from "ufo";

export default defineEventHandler(async (event) => {
  const { 
    NUXT_OAUTH_AUTH0_REDIRECT_URL: redirectURL,
    NUXT_OAUTH_AUTH0_DOMAIN: domain,
    NUXT_OAUTH_AUTH0_CLIENT_ID: clientId,
    NUXT_OAUTH_AUTH0_CLIENT_SECRET: clientSecret,
  } = process.env

  const authorizationURL = `https://${domain}/authorize`
  const tokenURL = `https://${domain}/oauth/token`

  const query = getQuery<{ code?: string }>(event)

  if (!query.code) {
    return sendRedirect(
      event,
      withQuery(authorizationURL as string, {
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectURL,
        scope: 'openid offline_access email',
        audience: '',
        max_age: 0,
        connection: '',
      }),
    )
  }

  try {
    const tokens: { token_type: string, access_token: string } = await $fetch(tokenURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code: query.code,
        redirect_uri: redirectURL,
      }
    })

    const data = { ...tokens } as any

    const res = await $fetch.raw('/api/auth', {
      method: 'POST',
      body:  data
    })

    const cookies = res.headers.getSetCookie()

    for (const cookie of cookies) {
      appendResponseHeader(event, 'set-cookie', cookie)
    }
  

    sendRedirect(event, '/')

  } catch (error) {
    console.log(error)
  }

});