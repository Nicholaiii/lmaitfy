<template>
  <div>
    <form class="space-y-6">
      <div ref="input">
        <Input v-model="link" />
      </div>
      <div class="flex items-center justify-center space-x-4 w-full">
        <Button>Create link</Button>
        <Button>Try yourself</Button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">import { onMounted, ref } from 'vue'

const emits = defineEmits(['getPosition'])
const input = ref<HTMLElement | null>(null)
onMounted(() => {
  if (input.value) {
    emits('getPosition', input.value.getBoundingClientRect())
  }
})
const link = ref('')
</script>

<style scoped></style>
