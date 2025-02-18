export default defineEventHandler(async (event) => {
  const { 
    NUXT_OAUTH_AUTH0_DOMAIN: domain,
    NUXT_OAUTH_AUTH0_CLIENT_ID: clientId,
    NUXT_OAUTH_AUTH0_CLIENT_SECRET: clientSecret,
  } = process.env

  const authorizationURL = `https://${domain}/oauth/token`
  const body = await readBody(event)

  const tokens: { token_type: string, access_token: string } = await $fetch(authorizationURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      grant_type: 'refresh_token',
      client_id: clientId as string,
      client_secret: clientSecret as string,
      refresh_token: body.refreshToken as string
    }
  })


  const res = await $fetch.raw('/api/auth', {
    method: 'POST',
    body:  tokens
  })

  const cookies = res.headers.getSetCookie()

  for (const cookie of cookies) {
    appendResponseHeader(event, 'set-cookie', cookie)
  }

  return authorizationURL

});