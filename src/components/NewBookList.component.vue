<template>
  <div>
    <h4>
      {{ title }}
      <small>
        <a :href="listUrl" target="_blank">(rediger søk)</a>
      </small>
    </h4>
    <ul class="fa-ul">

      <li v-for="book in books" :key="book.id">
        <span class="fa-li">
          <fa-icon v-if="book.ready_at" :icon="['far', 'check-circle']" class="text-success" title="Ferdig behandlet!"></fa-icon>
          <fa-icon v-else :icon="['far', 'circle']" class="text-info" title="Ikke ferdig"></fa-icon>
        </span>

        <router-link :to="{ name: 'record', params: { id: book.mms_id }}">{{ book.title }}</router-link>
        <small class="text-muted d-block">
          Mottatt {{ book.receiving_or_activation_date }}.
        </small>
      </li>
      <li>
        <em>Flere…</em>
      </li>

    </ul>
  </div>
</template>

<script>
import { http } from '@/services'
export default {
  name: 'NewBookList',
  props: {
    title: String,
    id: String,
  },
  data: function () {
    return {
      books: [],
    }
  },
  computed: {
    listUrl: function() {
      return `https://ub-tilvekst.uio.no/lists/${this.id}`
    }
  },
  mounted() {
    http.get(`https://ub-tilvekst.uio.no/lists/${this.id}.json`)
      .then(response => {
        console.log(response.data)
        this.books = response.data.slice(0, 10)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
