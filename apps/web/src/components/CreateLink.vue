<template>
  <div>
    <form class="space-y-6">
      <div ref="input">
        <AInput v-model="value" />
      </div>
      <div class="flex items-center justify-center space-x-4 w-full">
        <AButton>Create link</AButton>
        <AButton>Try yourself</AButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import AInput from '@/components/AInput.vue'
import AButton from '@/components/AButton.vue'

const props = defineProps({
  query: {
    type: String,
    required: true
  }
})

const value = ref('')

watch(
  () => props.query,
  (newVal) => {
    value.value = newVal
  }
)
const emits = defineEmits(['getPosition'])
const input = ref<HTMLElement | null>(null)
onMounted(() => {
  if (input.value) {
    emits('getPosition', input.value.getBoundingClientRect())
  }
})
</script>

<style scoped></style>
