import { appendResponseHeader } from 'h3'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) { return }

  const { session, loggedIn, clearSession } = useUserSession();
  
  const publicPaths = ['/', '/unauthorized'];
  const event = useRequestEvent()

  if (!loggedIn.value && !publicPaths.includes(to.path)) {
    return navigateTo('/')
  }

  if (loggedIn.value) {
    const authInfo = jwtDecode(session.value.idToken)
    const isExpired = authInfo.exp < Date.now() / 1000

    if (isExpired) {
      try {
      const res = await $fetch.raw('/api/refresh', {
        method: 'POST',
        body:  {
          refreshToken: session.value.refreshToken
        }
      })
      
      const cookies = res.headers.getSetCookie()
      
      if (cookies && event) {
        for (const cookie of cookies) {
          appendResponseHeader(event, 'set-cookie', cookie)
        }
      }
     } catch (e) {
      await clearSession()
      navigateTo('/')
     }
    }
    
  }

})