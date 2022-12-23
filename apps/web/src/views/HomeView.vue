<template>
  <div class="max-w-screen-sm mx-auto p-6 lg:p-0 text-center my-6 lg:my-24">
    <div class="space-y-10">
      <header>
        <h2 class="text-6xl font-bold text-gray-100">LMAITFY</h2>
        <h1 class="text-xl text-gray-100">Let me AI that for you</h1>
      </header>
      <CreateLink @get-position="(pos) => (inputPosition = pos)" />
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
  <p @click="moveCursor">Test move</p>
  <img ref="cursor" id="cursor" src="~/assets/cursor.svg" alt="" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CreateLink from '@/components/CreateLink.vue'

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

// animate the object to createlink ref slowly
const cursor = ref<HTMLElement | null>(null)
const inputPosition = ref<{ left: number; top: number }>({ left: 0, top: 0 })
const canMoveCursor = ref<boolean>(false)

const moveCursor = () => {
  if (cursor.value && inputPosition.value) {
    const { left, top } = cursor.value.getBoundingClientRect()
    const x = inputPosition.value.left - left + 12
    const y = inputPosition.value.top - top
    cursor.value.animate(
      [
        { transform: 'translate(0, 0)' },
        { transform: `translate(${x}px, ${y}px)` }
      ],
      {
        duration: 3000,
        iterations: 1,
        direction: 'alternate',
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    )
  }
}
onMounted(() => {
  if (cursor.value && inputPosition.value) {
    canMoveCursor.value = true
  }
})
</script>

<style scoped>
#cursor {
  width: 35px;
  height: 35px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
