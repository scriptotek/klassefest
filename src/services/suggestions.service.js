import { backend } from '@/services'
import { Suggestion } from '@/models'

const suggestionService = {

  async getSuggestions(provider, isbns) {
    console.log('Cha-cha-cha time', isbns)
    let result = await backend.request('get', 'suggestions', {
      params: {
        provider: provider,
        isbns: isbns.join(','),
      }
    })

    return {
      id: result.id,
      suggestions: Object.fromEntries(
        Object
          .entries(result.suggestions)
          .map( ([key, values]) => [
            key,
            values.map(value => new Suggestion(value))
          ])
      )
    }
  }

}

export default suggestionService
