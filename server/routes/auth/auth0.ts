import { withQuery } from "ufo";

export default defineEventHandler(async (event) => {
  const { 
    NUXT_OAUTH_AUTH0_REDIRECT_URL: redirectURL,
    NUXT_OAUTH_AUTH0_DOMAIN: domain,
    NUXT_OAUTH_AUTH0_CLIENT_ID: clientId,
  } = process.env
  const authorizationURL = `https://${domain}/authorize`
  const query = getQuery<{ code?: string }>(event)

  if (!query.code) {
    return sendRedirect(
      event,
      withQuery(authorizationURL as string, {
        response_type: 'code',
        client_id: clientId,
        redirect_uri: redirectURL,
        scope: ['email'],
        audience: [],
        max_age: 0,
        connection: '',
      }),
    )
  }

});