<template>
  <div v-if="visible" class="modal-overlay" @mousedown.self="close">
    <div class="modal" :style="{ top: top + 'px', left: left + 'px' }" @mousedown="tryStartDrag">
      <div class="modal-header" @mousedown.stop.prevent="tryStartDrag">
        <slot name="header">{{ $t('settings') }}</slot>
        <button class="close-btn" @click="close">×</button>
      </div>
      <div class="modal-body">
        <slot>Modal Content</slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  visible: Boolean,
});

const emit = defineEmits(['update:visible']);

const top = ref(100);
const left = ref(100);

let drag = {
  active: false,
  offsetX: 0,
  offsetY: 0,
};

const tryStartDrag = (event) => {
  if (!event.target.classList.contains('modal-header') && !event.target.closest('.modal-header')) return;

  drag.active = true;
  drag.offsetX = event.clientX - left.value;
  drag.offsetY = event.clientY - top.value;

  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);
};

const onDrag = (event) => {
  if (!drag.active) return;

  left.value = event.clientX - drag.offsetX;
  top.value = event.clientY - drag.offsetY;

  // keep modal inside viewport
  const maxLeft = window.innerWidth - 300;
  const maxTop = window.innerHeight - 300;
  left.value = Math.min(Math.max(0, left.value), maxLeft);
  top.value = Math.min(Math.max(0, top.value), maxTop);
};

const stopDrag = () => {
  drag.active = false;
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
};

const close = () => {
  emit('update:visible', false);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10000;
}

.modal {
  position: fixed;
  width: 300px;
  background: #111;
  color: white;
  border-radius: 8px;
  user-select: none;
  cursor: default;
  z-index: 10001;
}

.modal-header {
  background: #222;
  padding: 10px;
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #444;
  font-weight: bold;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
}

.modal-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
