import { flow } from 'lodash/util'
import { get } from 'lodash/object'
import { uniq } from 'lodash/array'
import { Concept } from '@/models'

class BibRecord {

  constructor(data) {
    this.data = data

    this.id = get(data, 'id')
    this.title = get(data, 'title')

    this.isbns = flow([
      data => get(data, 'isbns', []),
      isbns => isbns.map(val => val.replace(/[^0-9Xx]/g, '')),
      uniq,
    ])(data)

    let subjects = get(data, 'subjects', []).map(subject => new Concept(subject)),
      classifications = get(data, 'classifications', []).map(subject => new Concept(subject))

    this.concepts = subjects.concat(classifications)
  }

  get(path, defaultValue) {
    return get(this.data, path, defaultValue)
  }

  getConcepts(vocab) {
    return this.concepts
      .filter(concept => concept.vocabulary == vocab)
  }
}

export default BibRecord
