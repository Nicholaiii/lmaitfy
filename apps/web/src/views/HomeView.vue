<template>
  <div class="max-w-screen-sm mx-auto p-6 lg:p-0 text-center my-6 lg:my-24">
    <div class="space-y-10">
      <header>
        <h2 class="text-6xl font-bold text-gray-100">LMAITFY</h2>
        <h1 class="text-xl text-gray-100">Let me AI that for you</h1>
      </header>
      <AnimateSearch v-if="query" />
      <p v-else>No query</p>
      <footer>
        <p class="text-gray-500">
          Created by
          <a
            href="https://github.com/Nicholaiii"
            target="_blank"
            class="hover:text-gray-200 hover:underscore transition duration-75 ease-linear"
            >@nicholaiii</a
          >
          &
          <a
            href="https://github.com/ngajhede"
            target="_blank"
            class="hover:text-gray-200 hover:underscore transition duration-75 ease-linear"
            >@ngajhede</a
          >
          💖
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import AnimateSearch from '@/components/AnimateSearch.vue'

const route = useRoute()
const query = ref<string>(route.query.q as string)

/* TODO: Add some head library
useHead({
  title: "LMAITFY - Let me AI that for you",
  meta: [
    {
      name: "description",
      content:
        "LMAITFY is a web app that uses AI to generate an answer for you. It's like LMGTFY, but with AI.",
    },
  ],
});
*/

</script>
