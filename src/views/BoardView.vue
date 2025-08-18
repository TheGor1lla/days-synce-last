<template>
  <div>
    <div class="board-header">
      <div class="board-back-nav" @click="goBack">
        <ArrowLeftIcon />
        <button class="nav-button">{{ $t('back') }}</button>
      </div>

      <h1 class="board-title">{{ boardName }}</h1>

      <GearIcon @click="openBoardSettings" />
    </div>

    <BoardSettingsMovableModal
      :isVisible="isBoardSettingsVisible"
      :boardName="boardName"
      @board-renamed="(newBoardName) => handleBoardRenamed(newBoardName)"
      @board-deleted="handleBoardDeleted"
      @board-settings-closed="closeBoardSettings"
      @update:visible="closeBoardSettings"
    />

    <BaseButton @click="openAddMetric" :label="$t('createMetric')" severity="success" class="add-button">
      <template #icon>
        <NewAddIcon />
      </template>
    </BaseButton>

    <div v-if="isDevMode">
      <label for="time-toggle">
        Show time in:
        <select v-model="timeMode" id="time-toggle">
          <option value="seconds">Seconds</option>
          <option selected value="days">Days</option>
        </select>
      </label>
    </div>

    <AddMetricMovableModal
      @metric-created="handleMetricCreated"
      @add-metric-closed="closeAddMetric"
      :isVisible="isAddMetricVisible"
      @update:visible="closeAddMetric"
    />

    <div v-if="metrics.length > 0" class="metrics-container">
      <MetricCard
        v-for="(metric, index) in metrics"
        :key="index"
        :metric="metric"
        @open-settings="handleOpenMetricSettings(metric, index)"
        @reset="handleResetMetric(index)"
        :time-mode="timeMode"
      />
    </div>

    <MetricSettingsMovableModal
      v-if="selectedMetricCard !== null"
      :metricData="selectedMetricCard"
      :selectedMetricCardIndex="selectedMetricCardIndex"
      :isVisible="metricSettingsVisible"
      @close-settings="closeMetricSettings"
      @update="(updatedFields) => updateMetric(updatedFields.selectedMetricCardIndex, updatedFields)"
      @update:visible="closeMetricSettings"
      @delete="deleteMetric(index)"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import BaseButton from '@/components/BaseButton.vue';
import NewAddIcon from '@/assets/icons/NewAddIcon.vue';
import MetricCard from '@/components/MetricCard.vue';
import GearIcon from '@/assets/icons/GearIcon.vue';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon.vue';
import MetricSettingsMovableModal from '@/components/MetricSettingsMovableModal.vue';
import BoardSettingsMovableModal from '@/components/BoardSettingsMovableModal.vue';
import AddMetricMovableModal from '@/components/AddMetricMovableModal.vue';
import * as boardCalls from '@/composables/boardCalls.js';

const route = useRoute();
const router = useRouter();

const boardId = route.params.id;
const boardName = ref('');
const timeMode = ref('days');

const metrics = ref([]);

const metricSettingsVisible = ref(false);
const selectedMetricCard = ref(null);
const selectedMetricCardIndex = ref(null);

const isBoardSettingsVisible = ref(false);
const isAddMetricVisible = ref(false);

onMounted(async () => {
  await router.isReady();
  const data = await boardCalls.getBoard(boardId);
  boardName.value = data.data.name;
});

watch(
  () => route.params.boardId,
  async (id) => {
    if (!id) return;

    const board = await boardCalls.getBoard(id);
    console.log('board');
    console.log(board);

    // assuming metrics is derived from board_config
    metrics.value = board.board_config;
  },
  { immediate: true },
);

watch(
  metrics,
  () => {
    localStorage.setItem(`board-${boardId}`, JSON.stringify(metrics.value));
  },
  { deep: true },
);

const openBoardSettings = () => {
  isBoardSettingsVisible.value = true;
};

const closeBoardSettings = () => {
  isBoardSettingsVisible.value = false;
};

const openAddMetric = () => {
  isAddMetricVisible.value = true;
};

const closeAddMetric = () => {
  isAddMetricVisible.value = false;
};

const handleOpenMetricSettings = (metric, index) => {
  selectedMetricCard.value = metric;
  selectedMetricCardIndex.value = index;
  metricSettingsVisible.value = true;
};

const closeMetricSettings = () => {
  metricSettingsVisible.value = false;
  selectedMetricCard.value = null;
};

const handleMetricCreated = (newMetric) => {
  metrics.value.push(newMetric);
};

const handleResetMetric = (index) => {
  metrics.value[index].updatedAt = Date.now();
};

const deleteMetric = (index) => {
  metrics.value.splice(index, 1);
};

const updateMetric = (selectedMetricCardIndex, updatedFields) => {
  Object.assign(metrics.value[selectedMetricCardIndex], updatedFields);
};

const goBack = () => {
  router.push('/');
};

const handleBoardRenamed = (newBoardName) => {
  boardCalls.putNewBoardName(boardId, newBoardName);
  boardName.value = newBoardName;
  closeBoardSettings();
};

const handleBoardDeleted = async () => {
  try {
    await boardCalls.deleteBoard(boardId);
    router.push({
      path: '/',
      query: { deleted: boardName.value },
    });
  } catch (error) {
    console.error('Failed to delete board', error);
  }
};

const isDevMode = computed(() => {
  return import.meta.env.MODE === 'development';
});
</script>

<style scoped>
.board-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  position: relative;
  background: #1c1919;
  border-radius: 5px;
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 4rem;
}

.board-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
}

.board-back-nav {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.nav-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
}

.add-button {
  margin-left: 1rem;
  margin-bottom: 1rem;
}

.metrics-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  background: #1c1919;
  border-radius: 5px;
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
