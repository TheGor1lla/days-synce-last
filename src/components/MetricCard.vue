<template>
  <div class="metric-card" :style="{ backgroundColor: cardColor }">
    <div class="metric-header">
      <h3 class="description">{{ metric.description }}</h3>
      <div class="buttons">
        <ResetIcon width="1.5em" height="1.5em" style="margin-right: 0.5rem" @click="$emit('reset')" />
        <EditIcon width="1.5em" height="1.5em" @click="$emit('open-settings', props.metric)" />
      </div>
    </div>
    <p class="elapsed-time">{{ elapsedTime }}</p>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import EditIcon from '@/assets/icons/EditIcon.vue';
import ResetIcon from '@/assets/icons/ResetIcon.vue';

const now = ref(Date.now());

const showSettings = ref(false);

let intervalId;

const props = defineProps({
  metric: {
    type: Object,
    required: true,
  },
  timeMode: {
    type: String,
    required: true,
    validator(value) {
      return value === 'seconds' || value === 'days';
    },
  },
});

const editableDescription = ref(props.metric.description);
const editableFirstThreshold = ref(Number(props.metric.firstThreshold));
const editableSecondThreshold = ref(Number(props.metric.secondThreshold));

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

watch(
  () => showSettings.value,
  (visible) => {
    if (visible) {
      editableDescription.value = props.metric.description;
      editableFirstThreshold.value = Number(props.metric.firstThreshold);
      editableSecondThreshold.value = Number(props.metric.secondThreshold);
    }
  },
);

const ageInSeconds = computed(() => {
  return (now.value - props.metric.updatedAt) / 1000;
});

const ageInDays = computed(() => {
  return ageInSeconds.value / 86400;
});

const elapsedTime = computed(() => {
  return props.timeMode === 'days' ? ageInDays.value.toFixed(0) : ageInSeconds.value.toFixed(0);
});

const firstThresholdInSeconds = computed(() => {
  return props.metric.firstThreshold;
});

const secondThresholdInSeconds = computed(() => {
  return props.metric.secondThreshold;
});
const cardColor = computed(() => {
  const age = props.timeMode === 'days' ? ageInDays.value : ageInSeconds.value;
  const first = firstThresholdInSeconds.value;
  const second = secondThresholdInSeconds.value;
  const order = props.metric.order;

  if (order === 'ascending') {
    if (age < first) return 'green';
    if (age >= first && age < second) return 'goldenrod';
    return 'red';
  } else {
    if (age >= second) return 'green';
    if (age >= first && age < second) return 'goldenrod';
    return 'red';
  }
});
</script>

<style scoped>
.metric-card {
  border-radius: 8px;
  width: 200px;
  transition: background-color 0.4s ease;
  position: relative;
  color: white;
  user-select: none;
  padding: 1rem;
}

.description {
  font-weight: 700;
  font-size: 1.3em;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 12px;
}

.buttons {
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  gap: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.metric-card:hover .buttons {
  opacity: 1;
  pointer-events: auto;
}

.buttons {
  display: flex;
  gap: 0.25rem;
}

.buttons button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: white;
  padding: 2px 6px;
  line-height: 1;
}

.elapsed-time {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-top: 8px;
  color: white;
  text-align: center;
  font-size: 1.6em;
  line-height: 1;
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.description {
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}
</style>
