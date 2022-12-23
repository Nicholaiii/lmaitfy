<template>
  <div class="input-wrapper mx-auto rounded-lg p-2">
    <input v-model="value" class="w-full outline-0 text-gray-100" type="text" />
  </div>
</template>

<script setup lang="ts">import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emits('update:modelValue', value)
  }
})
</script>

<style scoped lang="scss">
.input-wrapper {
  background-color: rgb(64, 65, 79);
  input {
    background: transparent;
  }
}
</style>
