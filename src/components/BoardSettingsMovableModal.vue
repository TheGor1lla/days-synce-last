<template>
  <BaseMovableModal v-model:visible="props.isVisible">
    <template #header> {{ $t('settings') }}</template>

    <BaseButton @click="renameBoard" :label="$t('board.rename')" severity="info" class="modal-btn">
      <template #icon>
        <PencilIcon />
      </template>
    </BaseButton>

    <BaseButton @click="deleteBoard" :label="$t('board.delete')" severity="danger" class="modal-btn delete">
      <template #icon>
        <DeleteIcon />
      </template>
    </BaseButton>
  </BaseMovableModal>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
import PencilIcon from '@/assets/icons/PencilIcon.vue';
import BaseMovableModal from '@/components/BaseMovableModal.vue';
import DeleteIcon from '@/assets/icons/DeleteIcon.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  isVisible: {
    Boolean,
    required: true,
  },
  boardName: {
    String,
    required: true,
  },
});

const emit = defineEmits(['board-renamed', 'board-deleted']);

const renameBoard = () => {
  const newBoardName = prompt(t('board.renamePrompt'), props.boardName);
  if (!newBoardName?.trim()) return;

  emit('board-renamed', newBoardName);
};

const deleteBoard = () => {
  const confirmation = prompt(t('board.deletePrompt', { boardName: props.boardName }));

  if (confirmation !== props.boardName) {
    alert(t('board.deleteAlert'));
    return;
  }
  emit('board-deleted');
};
</script>
<style>
.modal-btn {
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}
</style>
