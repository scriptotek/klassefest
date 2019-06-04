import uuidv4 from 'uuid/v4';

class Concept {
  constructor({vocabulary, id, type, term}) {
    this.uuid = uuidv4()
    this.vocabulary = vocabulary
    this.id = id
    this.type = type
    this.term = term
    console.log(this)
  }
}

export default Concept
