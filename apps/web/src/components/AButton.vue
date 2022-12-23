<template>
  <button @click="emits('click')" :type="type" class="px-3 py-1 rounded-lg border border-gray-900 border-opacity-25 shadow hover:shadow-none text-gray-300 hover:text-gray-200 transition duration-75 ease-linear">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<'submit' | 'button' | 'reset'>,
    default: 'button'
  }
})

const emits = defineEmits(['click'])
</script>

<style scoped>
button {
  background-color: rgb(64, 65, 79);
}
</style>
