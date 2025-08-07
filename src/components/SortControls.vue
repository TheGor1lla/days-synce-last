<template>
  <div class="sort-controls">
    <Button label="Sort by Description" @click="sortMetrics('description')" />
    <Button label="Sort by Created At" @click="sortMetrics('createdAt')" />
    <Button label="Sort by Last Updated" @click="sortMetrics('lastUpdated')" />
    <Button label="Toggle Order (Asc/Desc)" @click="toggleOrder" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';

const emit = defineEmits(['onToggleOrder', 'onSortMetrics']);

const sortBy = ref('description');
const sortOrder = ref('asc');

const toggleOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  emit('onToggleOrder', sortOrder.value);
};

const sortMetrics = (field) => {
  sortBy.value = field;
  emit('onSortMetrics', field);
};
</script>
