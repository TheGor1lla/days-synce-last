<template>
  <div class="home">
    <div class="top">
      <Image src="/images/dsl-logo.png" alt="logo" width="100px" height="68px" />
    </div>

    <Toast />

    <section class="create">
      <h1>{{ $t('board.create') }}</h1>
      <HorizontalDivider />
      <InputText
        autofocus="true"
        v-model="newBoardName"
        :placeholder="$t('board.name')"
        class="space-below"
        @keyup.enter="createBoard"
      />
      <BaseButton @click="createBoard" :label="$t('board.create')" severity="success">
        <template #icon>
          <NewAddIcon />
        </template>
      </BaseButton>
    </section>

    <div v-if="boards.length > 0">
      <h1 class="visit">{{ $t('orVisit') }}</h1>
      <section class="list">
        <h1>{{ $t('board.existing') }}</h1>
        <HorizontalDivider />
        <ul>
          <li v-for="board in boards" :key="board.id">
            <router-link :to="`/board/${board.id}`">{{ board.name }}</router-link>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';
import { v4 as uuid } from 'uuid';

import BaseButton from '@/components/BaseButton.vue';
import InputText from 'primevue/inputtext';
import Image from 'primevue/image';
import NewAddIcon from '@/assets/icons/NewAddIcon.vue';
import Toast from 'primevue/toast';
import HorizontalDivider from '@/components/HorizontalDivider.vue';

const { t } = useI18n();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const newBoardName = ref('');
const boards = ref([]);

onMounted(() => {
  const stored = localStorage.getItem('boards');
  boards.value = stored ? JSON.parse(stored) : [];

  if (route.query.deleted) {
    const boardName = route.query.deleted;
    showDeletionSuccessToast(boardName);

    setTimeout(() => {
      router.replace({ query: {} });
    }, 3000);
  }
});

const createBoard = () => {
  if (!newBoardName.value.trim()) return;

  const id = uuid();
  const board = { id, name: newBoardName.value.trim() };
  boards.value.push(board);
  localStorage.setItem('boards', JSON.stringify(boards.value));

  newBoardName.value = '';
  router.push(`/board/${id}`);
};

const showDeletionSuccessToast = (boardName) => {
  toast.add({
    severity: 'success',
    summary: t('success'),
    detail: t('board.deleteSuccess', { boardName }),
    life: 3000,
  });
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.visit {
  margin-bottom: 2rem;
  font-size: 32px;
  text-align: center;
}

.space-below {
  margin-bottom: 1rem;
}

.top {
  margin-bottom: 4rem;
}

section {
  width: 50vw;
  display: flex;
  font-size: 32px;
  flex-direction: column;
  margin-bottom: 2rem;
  background: var(--section-color);
  border-radius: 5px;
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.3);
  padding: 1rem 2rem 2rem 2rem;
  text-align: center;
}
</style>
