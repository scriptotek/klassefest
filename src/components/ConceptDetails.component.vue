<template>
  <div class="card my-2">
  <h5 class="card-header">Detaljer</h5>
  <div class="card-body">
    {{ data }}
  </div>
</div>
</template>

<script>
export default {
  name: 'ConceptDetails',
  props: {
    data: Object,
  }
}
</script>
