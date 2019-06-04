<template>
  <b-container>

    <div class="row justify-content-md-center py-2">
      <div class="col col-sm-auto">
        <h2>Åpne en bok</h2>
        <LookupBook></LookupBook>
      </div>
    </div>

    <div class="py-3">
      <!--
      <h2>Eller velg blant nye bøker</h2>
      -->
      <b-row>
        <b-col>
          <NewBookList id="1" title="Fysikk"></NewBookList>
        </b-col>
        <b-col>
          <NewBookList id="13" title="Samling 42"></NewBookList>
        </b-col>
      </b-row>
    </div>

  </b-container>
</template>

<script>
// @ is an alias to /src
import { NewBookList, LookupBook } from '@/components'

export default {
  name: 'home',
  components: {
    NewBookList,
    LookupBook,
  },
}
</script>
