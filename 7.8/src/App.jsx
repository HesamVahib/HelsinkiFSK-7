import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return {
    type,
    value,
    onChange,
    reset
  }
}


const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    fetchData()
  }, [baseUrl])

  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    setResources(resources.concat(response.data))
  }

  const update = async (id, newObject) => {
    const response = await axios.put(`${ baseUrl }/${id}`, newObject)
    setResources(resources.map(r => r.id === id ? response.data : r))
  }

  const service = {
    create,
    update
  }

  return [
    resources, service
  ]
}

const App = () => {
  const {reset: resetContent, ...content} = useField('text')
  const {reset: resetName, ...name} = useField('text')
  const {reset: resetNumber, ...number} = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    resetContent()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    resetName()
    resetNumber()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App