<template>
  <div>
    {{ text }}
    <ul>
      <li class="box" v-for="metric in metrics">
        {{ metric.value }}
      </li>
    </ul>
  </div>
  <div>
    <form class="einstellungen" @submit.prevent="onFormSubmit">
      <div>
        <p>{{ $t('hello') }}</p>
        <h2>Wähle eine Option:</h2>
        <label>
          <input type="radio" value="hochzählen" v-model="selectedOption" />
          hochzählen
        </label>
        <label>
          <input type="radio" value="runterzählen" v-model="selectedOption" />
          runterzählen
        </label>
      </div>
      <div>
        <input type="text" v-model="input" name="address" rows="5" cols="30" style="resize: none" />
      </div>
      <button type="submit" label="Submit">text</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: 'erstellte metriken:',
      input: 'null',
      metrics: [],
    };
  },
  methods: {
    onFormSubmit() {
      let newMetric = {
        value: this.input,
      };
      this.metrics.push(newMetric);
      this.input = null;
    },
  },
};
</script>

<style scoped>
.einstellungen,
.box {
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  max-width: 300px;
  background-color: black;
  display: block;
  margin: 0.5rem;
}
</style>
