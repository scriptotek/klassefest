<template>
  <div class="card my-2">
    <div class="card-header d-flex">
      <h5>
        <fa-icon icon="lightbulb" class="text-warning"></fa-icon>
        Lille hjelper
      </h5>
      <b-checkbox class="ml-auto" v-model="hideNotFound">Skjul kilder som ikke har boka</b-checkbox>
    </div>
      <table class="table table-sm ">
        <thead>
          <th>
            Kilde
          </th>
          <th v-for="group in groups" :key="group.code">
            {{ group.label }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(provider, providerCode) in providers" :key="providerCode">
            <td>
              <a :href="provider.link" target="_blank" :class="{'text-success': provider.found}">{{ provider.name }}</a>
            </td>
            <td v-for="(group, index) in groups" :key="group.code">

              <div v-if="index == 0">
                <div v-if="provider.pending">
                  <b-spinner small variant="success" label="Spinning"></b-spinner>
                  Venter...
                </div>
                <small v-if="!provider.pending && !provider.error && !provider.found" class="text-muted">(Ikke treff på ISBN)</small>
                <small v-if="!provider.pending && provider.error" class="text-danger">{{ provider.error }}</small>
              </div>

              <div v-if="!provider.pending && provider.found && provider.suggestions[group.code]">

                <Suggestion
                  v-for="suggestion in provider.suggestions[group.code]"
                  :key="suggestion.uuid"
                  :data="suggestion"
                  :group="group.code"
                  @add-concept="concept => $emit('add-concept', concept)"
                  @click.native="activeSuggestion = suggestion"
                ></Suggestion>

              </div>

            </td>
          </tr>
        </tbody>
      </table>
      
  </div>
</template>
<style lang="sass" scoped>
$innerPaddingX: 1.25rem
$innerPaddingY: .75rem

th
  padding-top: $innerPaddingY

th:first-child, td:first-child
  padding-left: $innerPaddingX

th:last-child, td:last-child
  padding-right: $innerPaddingX

</style>
<script>
import { get } from 'lodash/object'
import { config, suggestions }  from '@/services'
import { Suggestion } from '@/components'

export default {
  name: 'Suggestions',
  components: {
    Suggestion,
  },
  props: {
    record: Object,
  },
  data: function () {
    return {
      activeSuggestion: null,
      hideNotFound: false,
      groups: [
        {
          label: 'Dewey',
          code: 'ddc',
        },
        {
          label: 'Emneord',
          code: 'subjects',
        },
      ],
      providers: {}
    }
  },
  computed: {
    activeUuid: function() {
      if (this.activeSuggestion) {
        return this.activeSuggestion.uuid
      }
      return '0'
    }
    // providers: function() {
    //   if (this.hideNotFound) {
    //     return config.providers.filter(provider => this.suggestions[provider.code] && this.suggestions[provider.code].found)
    //   }
    //   return config.providers
    // }
  },
  mounted() {
    config.providers.forEach(provider => {
      this.$set(this.providers, provider.code, {
        code: provider.code,
        name: provider.name,
        linkBase: provider.link,
        link: null,
        pending: true,
        error: null,
        found: false,
      })
      if (this.record.isbns.length) {
        suggestions.getSuggestions(provider.code, this.record.isbns)
          .then(result => {
            this.providers[provider.code].found = true
            this.providers[provider.code].link = this.providers[provider.code].linkBase.replace('{id}', result.id)
            this.$set(this.providers[provider.code], 'suggestions', result.suggestions)
          }).catch(error => {
            this.providers[provider.code].error = get(error, 'response.data.error') || error.message
          }).then(() => {
            this.providers[provider.code].pending = false
          })
      }
    })
  }
}
</script>
