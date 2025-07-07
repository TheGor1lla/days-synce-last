<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ $t('addMetric.heading') }}</h2>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="description">{{ $t('description') }}</label>
          <input type="text" id="description" v-model="metric.description" required />
        </div>

        <div class="form-group">
          <label for="firstThreshold">{{ $t('addMetric.thresholdFirst') }}</label>
          <input type="number" id="firstThreshold" v-model="metric.firstThreshold" required />
        </div>

        <div class="form-group">
          <label for="secondThreshold">{{ $t('addMetric.thresholdSecond') }}</label>
          <input type="number" id="secondThreshold" v-model="metric.secondThreshold" required />
        </div>

        <div class="form-group">
          <label>{{ $t('order') }}</label>
          <div>
            <input type="radio" id="ascending" value="ascending" v-model="metric.order" />
            <label for="ascending">{{ $t('addMetric.orderAscending') }}</label>

            <input type="radio" id="descending" value="descending" v-model="metric.order" />
            <label for="descending">{{ $t('addMetric.orderDescending') }}</label>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit">{{ $t('createMetric') }}</button>
          <button type="button" @click="closeDialog">{{ $t('cancel') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['metric-created']);

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  closeDialog: {
    type: Function,
    required: true,
  },
});

const metric = reactive({
  description: '',
  firstThreshold: null,
  secondThreshold: null,
  order: 'ascending',
});

const submitForm = () => {
  emit('metric-created', {
    ...metric,
    updatedAt: Date.now(),
  });
  props.closeDialog();
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: black;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
}

button[type='button'] {
  background-color: #6c757d;
}
</style>
