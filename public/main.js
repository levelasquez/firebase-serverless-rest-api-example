const url = 'https://us-central1-rest-api-15b67.cloudfunctions.net/api/pets'

const darDeBaja = async id => {
  event.target.parentElement.parentElement.remove()
  await fetch(`${url}/${id}/daralta`)
}

const fetchPets = async () => {
  const response = await fetch(url)
  const json = await response.json()

  return json
}

const tableTemplate = ({ _id, name, type, description }) => `
  <tr>
    <td>${name}</td>
    <td>${type}</td>
    <td>${description}</td>
    <td><button onclick="darDeBaja('${_id}')">Dar de baja</button></td>
  </tr>
`

const handleSubmit = async event => {
  event.preventDefault()
  const {
    name,
    type,
    description,
  } = event.target
  const data = {
    name: name.value,
    type: type.value,
    description: description.value,
  }
  name.value = ''
  type.value = ''
  description.value = ''

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  const json = await response.json()
  const template = tableTemplate({ ...data, _id: json })
  const table = document.getElementById('table')
  table.insertAdjacentHTML('beforeend', template)
}

window.onload = async () => {
  const petForm = document.getElementById('pet-form')
  petForm.onsubmit = handleSubmit

  const pets = await fetchPets()
  const template = pets.reduce((acc, el) => acc + tableTemplate(el), '')

  const table = document.getElementById('table')
  table.innerHTML = template
}
