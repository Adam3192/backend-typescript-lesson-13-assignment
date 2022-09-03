import React, { useContext } from 'react'
import CoffeeContext from '../contexts/CoffeeContext'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './CoffeeList.css'

const CoffeeList = () => {
  let { deleteCoffee } = useContext(CoffeeContext)
  let navigate = useNavigate()

  function handleDelete(id) {
    deleteCoffee(id).catch((error) => {
      console.log(error)
      navigate('/signin')
    })
    navigate('/coffee')
  }

  // function handleDelete(id) {
  //   try {
  //     deleteCoffee(id)
  //   }
  //   catch(err) {
  //     console.log(err)
  //     navigate('/signin')
  //   }
    
  //   navigate('/coffee')
  // }

  return (
    <CoffeeContext.Consumer>
      {({ coffee }) => {
        return (
          <div>
            <h1>Coffee List</h1>
            <Link to="/coffee/new">Add New Coffee</Link>
            <br></br>
            <br></br>
            <br></br>
            {console.log(coffee)}
            <div>
              {coffee.map((c) => {
                return (
                  <div key={c.id}>
                    <div className="container">
                      <h2>
                        {c.name} | ${c.price}
                      </h2>
                      <Form action={`/coffee/${c._id}`}>
                        <Button
                          className="ml-7"
                          variant="primary"
                          type="submit"
                        >
                          Edit
                        </Button>
                      </Form>
                      {/* <Link className="margin" to={`/coffee/${c._id}`}>
                        Edit Coffee
                      </Link> */}
                      <button
                        onClick={handleDelete.bind(this, c._id)}
                        className="margin"
                      >
                        Delete Coffee
                      </button>
                    </div>
                    <p>{c.description}</p>
                    <br></br>
                  </div>
                )
              })}
            </div>
          </div>
        )
      }}
    </CoffeeContext.Consumer>
  )
}

export default CoffeeList
