<template>
  <div>
    <form class="space-y-6">
      <AInput v-model="value" />
      <div class="flex items-center justify-center space-x-4 w-full">
        <AButton>Create link</AButton>
        <AButton>Try yourself</AButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AInput from '@/components/AInput.vue'
import AButton from '@/components/AButton.vue'

const value = ref('')
</script>

<style scoped></style>
