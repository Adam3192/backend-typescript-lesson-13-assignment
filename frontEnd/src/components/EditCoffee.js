import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CoffeeContext from '../contexts/CoffeeContext'

const EditCoffee = () => {
  let params = useParams()
  let [editedCoffee, setEditedCoffee] = useState({
    id: params._id,
    name: '',
    description: '',
    price: 0,
  })

  let { coffee, editCoffee, getCoffee, deleteCoffee } = useContext(CoffeeContext)
  let navigate = useNavigate()
  let { id, name, description, price } = editedCoffee
  // let id = params._id

  useEffect(() => {
    if (id === undefined) return
    async function fetch() {
      await getCoffee(id).then((coffee) => setEditedCoffee(coffee))
    }
    fetch()
  }, [id])

//   useEffect(() => {
//     getCoffee(coffee._id)
//   }, [])

  function handleChange(event) {
    setEditedCoffee((prevValue) => {
      return { ...prevValue, [event.target.name]: event.target.value }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    editCoffee(editedCoffee)
      .then(() => {
        navigate('/coffee')
      })
      .catch((error) => {
        console.log(error)
        navigate('/signin')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>EDIT COFFEE</h1>
      <span>Coffee Name </span>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <span>Description </span>
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <span>Price </span>
      <input
        type="number"
        name="price"
        value={price}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <button>Edit Coffee</button>
    </form>
  )
}

export default EditCoffee
