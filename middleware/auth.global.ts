import { setCookie } from 'h3'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) { return }

  const { session, loggedIn } = useUserSession();
  
  const publicPaths = ['/', '/unauthorized'];
  const event = useRequestEvent()

  if (!loggedIn.value && !publicPaths.includes(to.path)) {
    return navigateTo('/')
  }


  if (loggedIn.value) {
    const authInfo = jwtDecode(session.value.idToken)
    const isExpired = authInfo.exp < Date.now() / 1000

    if (!isExpired) {
      const res = await $fetch.raw('/api/refresh', {
        method: 'POST',
        body:  {
          refreshToken: session.value.refreshToken
        }
      })
      
      const cookies = res.headers.getSetCookie()
      
      if (cookies && event) {
        cookies.forEach(cookie => {
          setCookie(event, cookie.split(';')[0].split('=')[0], cookie.split(';')[0].split('=')[1], {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 1209540,
          });
        });
      }    
    }
    
  }

})