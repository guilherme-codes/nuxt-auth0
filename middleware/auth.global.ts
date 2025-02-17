export default defineNuxtRouteMiddleware(async (to, from) => {
  const { session: sessionState } = useAuth();
  
  if (to.path !== '/') {
    const { data: session } = await useFetch('/api/auth');

    if (session.value) {
      sessionState.value = session.value
    }

    if (!session.value) {
      return navigateTo('/', { replace: true });
    }
  }
});
