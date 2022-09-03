import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CoffeeContext from './CoffeeContext'

export const CoffeeProvider = (props) => {
  // let navigate = useNavigate()

  const [coffee, setCoffee] = useState([])
  const baseUrl = 'http://localhost:3000/api/coffee/'

  useEffect(() => {
    async function fetchData() {
      await getAllCoffee()
    }
    fetchData()
  }, [])

  function getAllCoffee() {
    return axios.get(baseUrl).then((response) => setCoffee(response.data))
  }

  function getCoffee(id) {
    return axios
      .get(baseUrl + id)
      .then((response) => new Promise((resolve) => resolve(response.data)))
      .catch(
        (error) => new Promise((_, reject) => reject(error.response.statusText))
      )
  }

  function addCoffee(coffee) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('myCoffeeToken')}`,
    }

    return axios
      .post(baseUrl, coffee, { headers: myHeaders })
      .then((response) => {
        getAllCoffee()
        return new Promise((resolve) => resolve(response.data))
      })
  }

  function editCoffee(coffee) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('myCoffeeToken')}`,
    }

    return axios
      .put(baseUrl + coffee._id, coffee, { headers: myHeaders })
      .then((response) => {
        getAllCoffee()
        return new Promise((resolve) => resolve(response.data))
      })
  }

  // function deleteCoffee(id) {
  //   return axios.delete(baseUrl + id).then((response) => {
  //     getAllCoffee()
  //   })
  // }

  function deleteCoffee(id) {
    // let navigate = useNavigate()

    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('myCoffeeToken')}`,
    }

    axios
      .delete(baseUrl + id, { headers: myHeaders })
      .then(getAllCoffee)
      .catch((error) => {
        console.log(error)
        // navigate('/signin')
      })
  }

  return (
    <CoffeeContext.Provider
      value={{
        coffee,
        getCoffee,
        addCoffee,
        editCoffee,
        deleteCoffee,
      }}
    >
      {props.children}
    </CoffeeContext.Provider>
  )
}
