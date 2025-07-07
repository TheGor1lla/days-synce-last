<template>
  <BaseMovableModal v-model:visible="props.isVisible" @update:visible="closeDialog">
    <template #header> {{ $t('addMetric.heading') }}</template>
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
          <br />
          <input type="radio" id="descending" value="descending" v-model="metric.order" />
          <label for="descending">{{ $t('addMetric.orderDescending') }}</label>
        </div>
      </div>

      <div class="modal-buttons">
        <BaseButton :label="$t('createMetric')" @click="saveChanges" type="submit" severity="success" class="modal-btn">
          <template #icon>
            <SaveIcon />
          </template>
        </BaseButton>

        <BaseButton :label="$t('cancel')" @click="closeDialog" severity="danger" class="modal-btn">
          <template #icon>
            <DeleteIcon />
          </template>
        </BaseButton>
      </div>
    </form>
  </BaseMovableModal>
</template>

<script setup>
import { reactive } from 'vue';
import BaseMovableModal from '@/components/BaseMovableModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import SaveIcon from '@/assets/icons/SaveIcon.vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';

const emit = defineEmits(['metric-created', 'add-metric-closed']);

const props = defineProps({
  isVisible: {
    type: Boolean,
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
  clearForm();
  closeDialog();
};

const clearForm = () => {
  metric.description = '';
  metric.firstThreshold = null;
  metric.secondThreshold = null;
  metric.order = 'ascending';
};

const closeDialog = () => {
  emit('add-metric-closed');
  clearForm();
};
</script>

<style scoped>
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
.modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.modal-btn {
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.modal-btn {
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}
</style>
