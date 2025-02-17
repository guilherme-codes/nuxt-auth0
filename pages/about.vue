<script setup lang="ts">
const { session, login, fetchUser, updateSession, deleteSession } = useAuth();

const handleLogin = async () => {
  await login('admin', 'password');
};

</script>

<template>
  <div>
    <p v-if="session">Welcome, {{ session }}</p>
    
    <button v-if="session" @click="() => updateSession({ token: 'newToken', refreshToken: 'newRefresh'})">Update Session</button>
    <br><br>

    <button v-if="session" @click="deleteSession">Delete Session</button>
  </div>
</template>
