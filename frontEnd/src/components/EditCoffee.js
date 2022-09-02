import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CoffeeContext from '../contexts/CoffeeContext'

const EditCoffee = () => {
  let [editedCoffee, setEditedCoffee] = useState({
    name: '',
    description: '',
    price: 0,
  })

  let { coffee, editCoffee, getCoffee } = useContext(CoffeeContext)
  let navigate = useNavigate()

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
        value={editedCoffee.coffeeName}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <span>Description </span>
      <input
        type="text"
        name="description"
        value={editedCoffee.description}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <span>Price </span>
      <input
        type="number"
        name="price"
        value={editedCoffee.price}
        onChange={handleChange}
      />
      <br></br>
      <br></br>
      <button>Edit Coffee</button>
    </form>
  )
}

export default EditCoffee
