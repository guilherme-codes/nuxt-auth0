<script setup lang="ts">
const { session, clearSession, loggedIn } = await useUserSession();

const router = useRouter()

function  goToLogin() {
  window.location.href = '/auth/auth0'
}
</script>

<template>
  <div>
    <p v-if="loggedIn">session: {{ session.refreshToken }}</p>
    <p v-else>no session</p>
    <button @click="goToLogin">Login</button> <br><br>
    <button @click="clearSession">Logout</button>
  </div>
</template>
