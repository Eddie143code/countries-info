<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";

const testHome = ref("Hello Home from app.vue, BRO!");
const testCountry = ref("Hello Country from app.vue, BRO!");
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
