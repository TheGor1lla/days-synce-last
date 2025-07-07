<template>
  <Button
    :label="label"
    :loading="loading"
    :disabled="disabled"
    :severity="severity"
    :outlined="outlined"
    :text="text"
    :link="link"
    :size="size"
    :rounded="rounded"
    :badge="badge"
    :badgeClass="badgeClass"
    :ariaLabel="ariaLabel"
    v-bind="$attrs"
  >
    <template #icon>
      <slot name="icon" />
    </template>
    <slot />
  </Button>
</template>

<script setup>
import Button from 'primevue/button';

defineProps({
  label: String,
  loading: Boolean,
  disabled: Boolean,
  severity: {
    type: String,
    validator: (value) => ['secondary', 'info', 'success', 'warn', 'danger', 'contrast', 'help'].includes(value),
  },
  outlined: Boolean,
  text: Boolean,
  link: Boolean,
  size: String,
  rounded: Boolean,
  badge: String,
  badgeClass: String,
  ariaLabel: String,
});
</script>
