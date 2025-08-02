<template>
  <BaseMovableModal v-model:visible="showSettings">
    <template #header> {{ $t('details') }}</template>

    <div class="modal-body">
      <label>
        <strong>{{ $t('description') }}</strong>
        <input v-model="editableDescription" type="text" />
      </label>

      <label>
        <strong>{{ $t('addMetric.thresholdFirst') }}</strong>
        <input v-model.number="editableFirstThreshold" type="number" />
      </label>

      <label>
        <strong>{{ $t('addMetric.thresholdSecond') }}</strong>
        <input v-model.number="editableSecondThreshold" type="number" />
      </label>

      <p>
        <strong>{{ $t('addMetric.order') }}:</strong> {{ metricData.order }}
        <select name="order" id="order" v-model="editableOrder">
          <option value="ascending" :selected="metricData.order === 'ascending'">Ascending</option>
          <option value="descending" :selected="metricData.order === 'descending'">Descending</option>
        </select>
      </p>
      <p>
        <strong>{{ $t('addMetric.lastUpdated') }}:</strong> {{ new Date(metricData.updatedAt).toLocaleString() }}
      </p>

      <div class="modal-buttons">
        <BaseButton :label="$t('addMetric.save')" @click="saveChanges" severity="success" class="modal-btn">
          <template #icon>
            <SaveIcon />
          </template>
        </BaseButton>

        <BaseButton :label="$t('addMetric.delete')" @click="deleteMetric" severity="danger" class="modal-btn">
          <template #icon>
            <DeleteIcon />
          </template>
        </BaseButton>
      </div>
    </div>
  </BaseMovableModal>
</template>

<script setup>
import { ref } from 'vue';
import BaseMovableModal from '@/components/BaseMovableModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import SaveIcon from '@/assets/icons/SaveIcon.vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';

const emit = defineEmits(['reset', 'delete', 'update']);

const props = defineProps({
  metricData: Object,
  selectedMetricCardIndex: Number,
  isVisible: Boolean,
});
const showSettings = ref(true);
const selectedMetricCardIndex = ref(props.selectedMetricCardIndex);
const editableDescription = ref(props.metricData.description);
const editableFirstThreshold = ref(Number(props.metricData.firstThreshold));
const editableSecondThreshold = ref(Number(props.metricData.secondThreshold));
const editableOrder = ref(props.metricData.orderd);

const saveChanges = () => {
  emit('update', {
    selectedMetricCardIndex: selectedMetricCardIndex.value,
    description: editableDescription.value,
    firstThreshold: editableFirstThreshold.value,
    secondThreshold: editableSecondThreshold.value,
    order: editableOrder.value,
  });
  closeModal();
};

const closeModal = () => {
  emit('close-settings');
};

const deleteMetric = () => {
  emit('delete');
  closeModal();
};
</script>

<style scoped>
.buttons button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: white;
  padding: 2px 6px;
  line-height: 1;
}

.modal-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-btn {
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.modal-body label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  margin-bottom: 12px;
}

.modal-body input[type='text'],
.modal-body input[type='number'] {
  margin-top: 4px;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #222;
  color: white;
  font-size: 1em;
}

.modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}
</style>
