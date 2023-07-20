<script setup>
import { ref } from "vue";
import axios from "axios";

const country = ref("");
const search = ref("");
const loading = ref(false);
const error = ref(false);
const submitCountry = async (e) => {
  e.preventDefault();

  try {
    loading.value = true;
    country.value = "";
    error.value = false;
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${search.value}`
    );

    country.value = {
      capital: res.data[0].capital,
      language: res.data[0].languages,
      population: res.data[0].population,
      name: res.data[0].name.common,
      region: res.data[0].region,
      flag: res.data[0].flags.png,
      map: res.data[0].maps.googleMaps,
    };
  } catch (err) {
    console.error(err);
    error.value = true;
    loading.value = false;
  }
  loading.value = false;
};
</script>

<template>
  <section class="flex justify-center items-center min-h-[100vh] bg-[#C70039]">
    <article
      class="flex flex-col bg-white w-[90%] max-w-[1000px] rounded-md shadow-2xl"
    >
      <div class="flex flex-col gap-8 min-h-[80vh]">
        <div
          className=" flex justify-center items-center text-[#C70039] text-2xl font-bold mt-6 md:text-4xl lg:text-5xl"
        >
          <h1>Countries of the world</h1>
        </div>
        <div class="flex justify-center">
          <form @submit.prevent="submitCountry">
            <input
              placeholder="Search..."
              class="pl-2 h-[4vh] w-[100%] border border-1 border-black rounded-md"
              v-model="search"
            />
          </form>
        </div>
        <div v-if="error" className="flex justify-center text-red-600">
          Invalid input. Try again
        </div>
        <template v-if="country">
          <div class="flex justify-center">
            <img :src="country.flag" alt="flag" />
          </div>
          <div class="flex justify-center text-[#C70039] text-2xl font-bold">
            <h2 class="w-[200px]">{{ country.name }}</h2>
          </div>
          <div
            class="flex flex-col gap-4 justify-center items-center font-bold mb-5"
          >
            <p class="bg-[#FFE5B4] w-[200px] rounded-md">
              Capital: {{ Object.values(country.capital).join(", ") }}
            </p>

            <template
              v-if="country.language && typeof country.language === 'object'"
            >
              <p class="bg-[#FFE5B4] w-[200px] rounded-md">
                Language: {{ Object.values(country.language).join(", ") }}
              </p>
            </template>
            <template v-else>
              <p class="bg-[#FFE5B4] w-[200px] rounded-md">
                Language: {{ country.language }}
              </p>
            </template>
            <p class="bg-[#FFE5B4] w-[200px] rounded-md">
              Population: {{ country.population }}
            </p>
            <p class="bg-[#FFE5B4] w-[200px] rounded-md">
              Region: {{ country.region }}
            </p>
          </div>
          <div class="flex justify-center mb-3">
            <a
              :href="country.map"
              class="p-3 bg-[#FF4177] text-white font-medium rounded-md"
            >
              See on Google Maps
            </a>
          </div>
        </template>
        <div v-if="loading" class="flex justify-center">loading...</div>
      </div>
    </article>
  </section>
</template>

<style scoped></style>
