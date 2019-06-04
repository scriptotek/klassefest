<template>
  <b-container>
    <b-alert :show="error !== null" variant="danger" dismissible>
      {{ error }}
    </b-alert>
    <div v-if="!error && (!rec || !user)">
      <h2>På telefonen med Alma...</h2>
    </div>
    <div v-if="rec && user">

      <!-- Metadata -->
      <h2>{{ rec.title }}</h2>
      <p>
        Identifiers:
        <b-badge>{{ rec.id }}</b-badge>&thinsp;
        <span v-for="isbn in rec.isbns" :key="isbn"><b-badge>{{isbn}}</b-badge>&thinsp; </span>
      </p>

      <!-- Suggestions -->
      <Suggestions
        :record="rec"
        @add-concept="addConceptFromSuggestion"
      ></Suggestions>

      <b-row>        

        <!-- VocabularyClassifier -->
        <b-col>
          <b-card class="my-2" no-body>
            <h4 slot="header">Katalogposten min</h4>
            <b-list-group flush>
              <b-list-group-item v-for="vocab in user.settings.vocabularies" :key="vocab">
                <VocabularyClassifier
                  :vocab="vocab"
                  :record="rec"
                  :ref="'classifier-' + vocab"
                  @select-vocabulary="selectVocabulary"
                  @show-concept="showConcept"
                ></VocabularyClassifier>
              </b-list-group-item>
            </b-list-group>
            <b-card-footer>
              <b-btn variant="success" @click="save" v-b-modal.modal-center>
                Lagre til Alma
              </b-btn>
              <b-modal id="modal-center" centered title="Kan ikke lagre" v-model="showSaveModal">
                <p class="my-4">
                  Lagring er ikke mulig enda.
                </p>
                <div slot="modal-footer" class="w-100">
                  <p class="float-left"></p>
                  <b-button
                    variant="primary"
                    size="sm"
                    class="float-right"
                    @click="showSaveModal=false"
                  >
                    Uff da, det var dumt
                  </b-button>
                </div>
              </b-modal>
            </b-card-footer>
          </b-card>
        </b-col>

        <!-- VocabularySearch -->
        <b-col>
          <VocabularySearch
            :vocabulary="selectedVocabulary"
            @add-concept="addConceptFromSuggestion"
          ></VocabularySearch>
        </b-col>

        <!-- ConceptDetails -->
        <b-col>
          <ConceptDetails :data="selectedConcept"></ConceptDetails>
        </b-col>

      </b-row>

    </div>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { VocabularyClassifier, VocabularySearch, Suggestions, ConceptDetails } from '@/components'
import { config, lsm, user as userService } from '@/services'

export default {
  name: 'record',
  components: {
    VocabularyClassifier,
    VocabularySearch,
    Suggestions,
    ConceptDetails,
  },
  props: {
    id: String,
  },
  data: function () {
    return {
      showSaveModal: false,
      selectedVocabulary: null,
      config: config,
      error: null,
      user: null,
      rec: null,
      selectedConcept: null
    }
  },
  beforeRouteEnter (to, from, next) {
    // Called before the route that renders this component is confirmed.
    if (to.params.id.substr(to.params.id.length - 2) != '01') {
      // The ID is not a network zone ID. Let's try to find the NZ ID.
      // TODO: Validate/test length, check ISBN and other barcodes as well?
      lsm.get(to.params.id, false)
        .then(response => {
          console.log(`Redirecting from ${to.params.id} to ${response.data.nz_id}`)
          next({ name: 'record', params: { id: response.data.nz_id }, replace: true})
        })
        .catch(error => next(error))
    } else {
      next()
    }
  },
  beforeRouteUpdate (to, from, next) {
    // One thing to note when using routes with params is that when the 
    // user navigates from /user/foo to /user/bar, the same component instance will be reused. 
    // React to param changes.
    console.log('Update route to', to)

    // don't forget to call next()
    next()
  },
  mounted: function () {
    userService.get()
      .then(user => this.user = user)

    lsm.get(this.id)
      .then(record => {
        this.rec = record
      })
      .catch(error => {
        console.log('ERRd out', error.message)
        this.error = error.message
      })
  },
  methods: {
    selectVocabulary(vocabulary) {
      console.log('Select', vocabulary)
      this.selectedVocabulary = vocabulary
    },
    showConcept(concept) {
      console.log('Show concept', concept)
      this.selectedConcept = concept
    },
    addConceptFromSuggestion(concept) {
      console.log('Add?', concept)
      const classifier = this.$refs['classifier-' + concept.vocabulary]
      if (classifier && classifier.length) {
        console.log('Found a classifier', classifier[0])
        classifier[0].addConcept(concept)
      }
    },
    save() {
      
    }
  }
}
</script>
