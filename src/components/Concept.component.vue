<template>
  <b-badge href="#" variant="primary" @click="$emit('show')">
    <fa-icon :icon="icon" v-if="icon" /> 
    {{ concept.term }}
    <span @click.stop="$emit('remove')">[X]</span>
  </b-badge>
</template>

<script>
const icons = {
  '648': 'calendar-alt',
  '650': 'tag',
  '651': 'globe-africa',
  '655': 'box-open',
}
export default {
  name: 'Concept',
  computed: {
    icon() {
      return icons[this.concept.type]
    }
  },
  props: {
    concept: Object
  }
}
</script>

<style>

</style>
