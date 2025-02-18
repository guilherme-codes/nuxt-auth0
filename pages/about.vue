<script setup lang="ts">
const { session, clearSession } = useUserSession();

</script>

<template>
  <div>
    <p v-if="session">Welcome, {{ session }}</p>
    
    <button v-if="session" @click="clearSession">Logout</button>
  </div>
</template>
