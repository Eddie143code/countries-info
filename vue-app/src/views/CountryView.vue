<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { store } from "../store/country";
import Arrow from "../assets/Arrow_1.png";

const country = ref("");
const countryExtra = ref("");

country.value = store.country;
countryExtra.value = store.countryExtra;
</script>

<template>
  <section class="flex justify-center items-center h-[100vh] bg-[#C70039]">
    <article
      class="flex flex-col min-h-[90vh] bg-white w-[90%] max-w-[1000px] rounded-md shadow-2xl"
    >
      <div class="flex flex-col gap-10 justify-center items-center">
        <div class="m-1 w-[100%]">
          <button
            @click="goBack"
            class="p-1 bg-[#FF4177] text-white font-medium rounded-md"
          >
            <img src="../assets/Arrow_1.png" class="w-8 h-6" />
          </button>
        </div>
        <div class="flex justify-center text-[#C70039] text-4xl font-bold">
          {{ countryExtra.name }}
        </div>
        <div class="flex justify-center">
          <img :src="countryExtra.flag" alt="flag" />
        </div>
        <template v-if="country && countryExtra">
          <div
            class="flex flex-wrap gap-10 justify-center items-center max-w-[500px]"
          >
            <p
              v-for="(value, key) in country"
              :key="key"
              class="p- bg-[#FFE5B4] w-[200px] rounded-md font-bold"
            >
              {{ key.charAt(0).toUpperCase() + key.slice(1) }}: {{ value }}
            </p>
          </div>
        </template>
      </div>
    </article>
  </section>
</template>

<style scoped></style>
