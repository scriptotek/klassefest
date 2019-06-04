import uuidv4 from 'uuid/v4';
import { http } from '@/services'

class Suggestion {
  constructor({vocabulary, id, value, type, uri}) {
    this.uuid = uuidv4()
    this.vocabulary = vocabulary
    this.id = id
    this.value = value
    this.type = type
    this.uri = uri
    this.heading = null
    this.classFound = null
    
    if (this.type == '082') {
      http.request({
        method: 'get',
        url: 'https://ub-www01.uio.no/microservices/dewey_heading.php',
        params: {
          number: this.value
        }
      }).then(response => {
        this.heading = response.data
        this.classFound = true
      }).catch(() => {
        this.heading = '(heading not found)'
        this.classFound = false
      })
    }
  } 
}

export default Suggestion
