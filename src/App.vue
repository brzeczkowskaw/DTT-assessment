<script setup>
import NavBar from '../src/components/NavBar.vue'

</script>

<template>
  <div>
    <NavBar />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
@import './assets/styles/variables.css';
</style>
