<template>
  <div>
    <h5 class="d-flex">
      <div>{{ vocabulary.name }}</div>
      <b-btn class="ml-auto" @click="search" size="sm" variant="success">
        <fa-icon icon="plus"></fa-icon>
      </b-btn>
    </h5>
    <div>
      <div v-if="!concepts.length" class="text-muted">(mangler)</div>
      <div v-for="concept in concepts" :key="concept.uuid">
        <Concept
          :concept="concept"
          @show="$emit('show-concept', concept)"
          @remove="removeConcept(concept)"
        ></Concept>
      </div>
    </div>
  </div>
</template>

<script>
import { Concept } from '@/components'
import { config } from '@/services'

export default {
  name: 'VocabularyClassifier',
  props: {
    vocab: String,
    record: Object,
  },
  components: {
    Concept,
  },
  computed: {
    vocabulary: function() {
      return config.vocabularies[this.vocab]
    }
  },
  data: function() {
    return {
      concepts: [],
    }
  },
  mounted() {
    this.concepts = this.record.getConcepts(this.vocabulary.marc_code)
  },
  methods: {
    search() {
      this.$emit('select-vocabulary', this.vocabulary)
    },
    removeConcept(concept) {
      this.concepts.splice(this.concepts.indexOf(concept), 1) 
    },
    addConcept(concept) {
      // TODO: CHeck if already exists
      console.log('Add concept:', concept)
      this.concepts.push(concept)
    }
  }
}
</script>

