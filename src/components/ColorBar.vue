<template>
  <div>
    <div class="toggle-container">
      <label for="color-toggle">Toggle Color Order:</label>
      <input type="checkbox" id="color-toggle" v-model="isAscending" @change="emitOrder" />
      <span>{{ isAscending ? 'Ascending' : 'Descending' }}</span>
    </div>

    <div class="color-bar" :style="barStyle"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const isAscending = ref(true);

const emit = defineEmits('order-changed');

const barStyle = computed(() => {
  const direction = isAscending.value
    ? 'green 33.33%, yellow 33.33%, yellow 66.66%, red 66.66%'
    : 'red 33.33%, yellow 33.33%, yellow 66.66%, green 66.66%';

  return {
    background: `linear-gradient(to right, ${direction})`,
  };
});

const emitOrder = () => {
  emit('order-changed', isAscending.value ? 'ascending' : 'descending');
};
</script>

<style scoped>
.toggle-container {
  margin-bottom: 10px;
}

.toggle-container label {
  margin-right: 10px;
}

input[type='checkbox'] {
  margin-right: 5px;
}

.color-bar {
  width: 100%;
  height: 10px;
  border-radius: 50px;
}

span {
  font-weight: bold;
  margin-left: 10px;
}
</style>
