<template>
  <div v-auto-animate class="space-y-6">
    <div ref="input">
      <AInput v-model="queryInput" />
    </div>
    <div class="flex items-center justify-center space-x-4 w-full">
      <AButton @click="submitQuery(queryInput)">
        <span ref="goButton">Let's ask AI!</span>
      </AButton>
    </div>
    <div v-if="showResultBox" class="result-box relative text-gray-300 p-6 rounded-lg transition-all duration-75 ease-linear flex justify-center">
      <img v-if="loadingQuery" src="@/assets/loading.svg" alt="loading spinner">
      <pre class="whitespace-pre-line" v-else>{{ result }}</pre>
    </div>
  </div>
  <img ref="cursor" id="cursor" src="@/assets/cursor.svg" alt="" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AInput from '@/components/AInput.vue'
import AButton from '@/components/AButton.vue'
import { queryGPT } from '@/services/GPTService'

const route = useRoute()
const query = ref<string>(route.query.q as string)
const queryInput = ref<string>('')
const loadingQuery = ref<boolean>(false)
const showResultBox = ref<boolean>(false)
const result = ref<string>('')

const animationSpeed = ref<number>(3000)

// animate the object to createlink ref slowly
const cursor = ref<HTMLElement | null>(null)
const input = ref<HTMLElement | null>(null)
const goButton = ref<HTMLElement | null>(null)

const moveCursorToInput = () => {
  if (cursor.value && input.value) {
    const { left, top } = cursor.value.getBoundingClientRect()
    const { left: inputLeft, top: inputTop } = input.value.getBoundingClientRect()
    const x = inputLeft - left + 12
    const y = inputTop - top + 20

    animate(x, y, 2000)
  }
}

const moveCursorToButton = () => {
  if (cursor.value && goButton.value) {
    const { left, top } = goButton.value.getBoundingClientRect()
    const x = left + 35
    const y = top - 35

    animate(x, y, 1500)
  }
}

const fadeOutCursor = async () => {
  if (cursor.value) {
    cursor.value.animate(
      [
        { opacity: 1 },
        { opacity: 0 }
      ],
      {
        duration: 1000,
        iterations: 1,
        direction: 'alternate',
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    )
    await new Promise((resolve) => setTimeout(resolve, 1000))
    cursor.value.style.display = 'none'
  }
}

const animate = async (x: number, y: number, speed: number) => {
  animationSpeed.value = speed
  if (cursor.value) {
    cursor.value.animate(
      [
        { transform: `translate(${x}, ${y})` },
        { transform: `translate(${x}px, ${y}px)` }
      ],
      {
        duration: speed || 3000,
        iterations: 1,
        direction: 'alternate',
        easing: 'ease-in-out',
        fill: 'forwards'
      }
    )
  }
}

onMounted(async () => {
  if (query.value && cursor.value && input.value) {
    moveCursorToInput()
    await new Promise((resolve) => setTimeout(resolve, animationSpeed.value))
    for (let i = 0; i < query.value.length; i++) {
      queryInput.value += query.value[i]
      await new Promise((resolve) => setTimeout(resolve, 75))
    }
    moveCursorToButton()
    await new Promise((resolve) => setTimeout(resolve, animationSpeed.value))
    fadeOutCursor()
    loadingQuery.value = true
    showResultBox.value = true
    submitQuery(query.value)
  }
})

const submitQuery = async (query: string) => {
  loadingQuery.value = true
  result.value = ''
  await queryGPT(query).then((response) => {
    console.log(response.message)
    result.value = response.message
    loadingQuery.value = false
  }).catch((error) => {
    console.log(error)
    loadingQuery.value = false
  })
}
</script>

<style scoped>
#cursor {
  width: 35px;
  height: 35px;
  position: absolute;
  left: 0;
  top: 0;
}

.result-box{
  background-color: rgb(64, 65, 79);
}
</style>
