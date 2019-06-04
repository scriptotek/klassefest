<template>
  <span>
    <span class="suggestion" tabindex="0" :id="'s_' + data.uuid" >
      {{data.value}}
      <small class="text-muted" v-if="data.vocabulary">({{ data.vocabulary }})</small>
      <small class="text-muted" v-if="data.edition">({{data.edition}})</small>
      <small class="text-muted" v-if="data.agency">({{data.agency}})</small>
    </span>
    <b-popover :target="'s_' + data.uuid" :show.sync="popoverShow" triggers="focus">

      <div v-if="data.type == '082'">
        {{ data.value }} {{ data.heading }}
        <div>
          <a :href="'https://deweyno.pansoft.de/webdewey/index_11.html?recordId=ddc%3A' + data.value" target="_blank">
            <span v-if="data.classFound" class="text-success">Finnes i Norsk WebDewey</span>
            <span v-if="!data.classFound" class="text-danger">Finnes ikke i Norsk WebDewey</span>          
          </a>
        </div>
        <div>
          Søk i <a :href="'https://www.worldcat.org/search?q=dd%3A' + data.value" target="_blank">Worldcat</a>
          &centerdot;
          <a :href="'https://app.uio.no/ub/emnesok/ddc/search?term=' + data.value" target="_blank">Emnesøk</a>
        </div>
        <b-btn variant="success" size="sm" @click="add">Legg til</b-btn>
      </div>
      <div v-else-if="data.vocabulary == 'realfagstermer'">
        {{ data.prefLabel }}
        ID: {{ data.id || '(ikke opgitt)' }}<br>
        <div>
          Søk i <a :href="'https://app.uio.no/ub/emnesok/realfagstermer/search?id=' + data.id" target="_blank">Emnesøk</a>
        </div>
        <b-btn variant="success" size="sm" @click="add">Legg til</b-btn>
      </div>
      <div v-else>
        Term: {{ data.value }}<br>
        ID: {{ data.id || '(ikke opgitt)' }}<br>
        Vokabular: {{ data.vocabulary || '(ikke opgitt)' }}
      </div>
    
    </b-popover>
  </span>
</template>

<script>
import { Concept } from '@/models'
export default {
  name: 'Suggestion',
  props: {
    group: String,
    data: Object,
  },
  data() {
    return {
      popoverShow: false
    }
  },
  methods: {
    add() {

      const concept = new Concept({
        type: this.data.type,
        id: this.data.id,
        term: this.data.value,
        edition: this.data.edition,
        vocabulary: this.data.vocabulary,
      })
      console.log('ADD', this.data.value)
      this.$emit('add-concept', concept)
      this.popoverShow = false
    }
  }
}
</script>

<style scoped lang="sass">
.suggestion
  cursor: pointer
  display: inline-block
  border-bottom: 1px dotted #ccc
  padding: 0 6px
  font-size: 90%
  margin: 1px 6px 1px 0

.suggestion:hover, .suggestion:focus
  background: rgba(0,0,0,.03)

</style>
