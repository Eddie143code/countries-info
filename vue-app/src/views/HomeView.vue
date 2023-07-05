<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { store } from "../store/country";

const token = import.meta.env.VITE_TOKEN;
const props = defineProps({
  testHome: String,
});
console.log(props.testHome);

const country = ref("");
const countryExtra = ref("");
const search = ref("");
const loading = ref(false);
const submitCountry = async (e) => {
  e.preventDefault();
  loading.value = true;
  country.value = "";
  countryExtra.value = "";
  try {
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${search.value}`
    );
    const result = await axios.get(
      `https://api.api-ninjas.com/v1/country?name=${search.value}`,
      {
        headers: {
          "X-Api-Key": token,
        },
      }
    );

    store.country = {
      capital: result.data[0].capital,
      pop: result.data[0].population,
      pop_growth: result.data[0].pop_growth,
      fertility: result.data[0].fertility,
      currency: result.data[0].currency.name,
      region: result.data[0].region,
      gdp: result.data[0].gdp,
      gdp_per_capita: result.data[0].gdp_per_capita,
      gdp_growth: result.data[0].gdp_growth,
      unemployment: result.data[0].unemployment,
      life_expectancy_male: result.data[0].life_expectancy_male,
      life_expectancy_female: result.data[0].life_expectancy_female,
    };
    store.countryExtra = {
      capital: result.data[0].capital,
      language: res.data[0].languages,
      name: result.data[0].name,
      flag: res.data[0].flags.png,
      map: res.data[0].maps.googleMaps,
    };
  } catch (error) {
    console.error(error);
  }

  country.value = store.country;
  countryExtra.value = store.countryExtra;
  loading.value = false;
};
const router = useRouter();
const toCountry = () => {
  router.push({
    name: `country`,
    params: {},
    query: {},
  });
};
</script>

<template>
  <section class="flex justify-center items-center h-[100vh] bg-[#C70039]">
    <article
      class="flex flex-col bg-white w-[90%] max-w-[1000px] rounded-md shadow-2xl"
    >
      <div class="flex flex-col gap-12 min-h-[80vh]">
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
        <template v-if="country && countryExtra">
          <div class="flex justify-center">
            <img :src="countryExtra.flag" alt="flag" />
          </div>
          <div class="flex justify-center text-[#C70039] text-2xl font-bold">
            <h2 class="w-[200px]">{{ countryExtra.name }}</h2>
          </div>
          <div
            class="flex flex-col gap-4 justify-center items-center font-bold"
          >
            <p class="bg-[#FFE5B4] w-[200px] rounded-md">
              Capital: {{ countryExtra.capital }}
            </p>

            <template
              v-if="
                countryExtra.language &&
                typeof countryExtra.language === 'object'
              "
            >
              <p class="bg-[#FFE5B4] w-[200px] rounded-md">
                Language: {{ Object.values(countryExtra.language).join(", ") }}
              </p>
            </template>
            <template v-else>
              <p class="bg-[#FFE5B4] w-[200px] rounded-md">
                Language: {{ countryExtra.language }}
              </p>
            </template>
            <p class="bg-[#FFE5B4] w-[200px] rounded-md">
              Population: {{ country.pop }}000
            </p>
            <p class="bg-[#FFE5B4] w-[200px] rounded-md">
              Currency: {{ country.currency }}
            </p>
          </div>
        </template>
        <template v-else>
          <div v-if="loading" class="flex justify-center">loading...</div>
        </template>
      </div>
      <div class="flex justify-center my-3">
        <router-link to="/country">
          <button
            @click="toCountry"
            class="p-3 bg-[#FF4177] text-white font-medium rounded-md"
          >
            Click for more
          </button></router-link
        >
      </div>
    </article>
  </section>
</template>

<style scoped></style>
