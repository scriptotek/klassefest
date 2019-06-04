<template>
  <div class="card my-2" v-if="vocabulary">
    <h5 class="card-header">Søk i {{ vocabulary.name }}</h5>
    <div class="card-body">
      <b-form @submit.prevent="onSubmit">
        <b-form-input autofocus v-model="query[vocab_code]" placeholder="Search"></b-form-input>
      </b-form>

      <div v-if="results[vocab_code]">
        <div v-if="!results[vocab_code].length">Ingen treff</div>
        <div v-for="suggestion in results[vocab_code]" :key="suggestion.uri">
          <Suggestion
            :key="suggestion.uuid"
            :data="suggestion"
            @add-concept="concept => $emit('add-concept', concept)"
          ></Suggestion>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash/object'
import { http } from '@/services'
import { uniqBy } from 'lodash/array'
import { Suggestion } from '@/components'
import { Suggestion as SuggestionModel } from '@/models'

export default {
  name: 'VocabularySearch',
  components: {
    Suggestion,
  },
  props: {
    vocabulary: Object,
  },
  watch: {
    vocabulary: function(val) {
      console.log('Update', val)
      if (!this.query[val.key]) {
        this.$set(this.query, this.vocabulary.key, '')
      }
      if (!this.results[val.key]) {
        this.$set(this.results, this.vocabulary.key, [])
      }
    }
  },
  computed: {
    vocab_code: function() {
      return this.vocabulary && this.vocabulary.key || null
    }
  },
  data: function() {
    return {
      query: {},
      results: {},
    }
  },
  methods: {
    onSubmit: async function() {
      console.log('SEARCH')
      this.results = []
      let response = await http.get('https://data.ub.uio.no/skosmos/rest/v1/search', {
        params: {
          query: `${this.query[this.vocab_code]}*`,
          labellang: this.vocabulary.index_language,
          type: get(this.vocabulary, 'skosmos_types', []).join(' '),
          vocab: this.vocabulary.skosmos_code || this.vocabulary.key,
        }
      })
      let results = uniqBy(response.data.results, 'uri').map(result => new SuggestionModel({

        // TODO: Clean up this mess from the demo!
        type: (result.vocab == 'ddc') && '082' || '650',
        value: result.notation || result.prefLabel,

        // TODO: Clean up this mess from the demo!
        vocabulary: result.vocab.replace(/^ddc$/, 'ddc23nor'),
        
        uri: result.uri,
        id: result.localname,
      }))
      this.$set(this.results, this.vocab_code, results)
      // TODO: Map into Concept objects
    }
  }
}
</script>
