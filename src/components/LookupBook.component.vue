<template>
  <b-form inline @submit.prevent="onSubmit">
    <label class="sr-only" for="inline-form-input-name">Identifikator (ISBN eller lignende)</label>
    <b-input
      autofocus
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="ISBN eller strekkode"
      v-model="input"
    ></b-input>
    <LoadingButton :running="busy">Åpne</LoadingButton>

    <b-alert :show="error !== null" variant="danger" dismissible>
      {{ error }}
    </b-alert>
    <div v-if="choices.length">
      Flere treff. Du må velge. Men jeg vet ikke hvordan enda.
    </div>
  </b-form>
</template>

<script>
import { LoadingButton } from '@/components'
import { lsm } from '@/services';

export default {
  name: 'LookupBook',
  components: {
    LoadingButton,
  },
  props: {
    id: String
  },
  data: function() {
    return {
      busy: false,
      error: null,
      input: '',
      choices: [],
    }
  },
  methods: {
    onSubmit() {
      this.error = null
      this.choices = []
      this.busy = true
      lsm.find(this.input)
        .then(response => {
          if (response.data.results.length == 0) {
            throw new Error('Boka ble ikke funnet')
          }
          if (response.data.results.length > 1) {
            this.choices = response.data.results
            return
          }
          if (response.data.results.length == 1) {
            let id = response.data.results[0].nz_id
            if (!id) {
              throw new Error('Fant ikke network zone-ID for denne boka')
            }
            this.$router.push({ name: 'record', params: { id: id } })
          }
        })
        .catch(error => {
          this.error = 'Det oppsto en feil: ' + error.message
        })
        .then(() => {
          this.busy = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
button
  position: relative
  -webkit-transition: all 0.2s
  transition: all 0.2s
  transition-timing-function: ease-in


</style>
