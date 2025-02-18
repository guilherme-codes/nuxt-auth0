<script setup lang="ts">
const { session, login, fetchUser, deleteSession } = useAuth();

</script>

<template>
  <div>
    <p v-if="session">Welcome, {{ session }}</p>
    
    <button v-if="session" @click="deleteSession">Delete Session</button>
  </div>
</template>
