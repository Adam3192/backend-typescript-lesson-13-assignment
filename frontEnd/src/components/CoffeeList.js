import React from 'react'
import CoffeeContext from '../contexts/CoffeeContext'
import { Link, useParams } from 'react-router-dom'

const CoffeeList = () => {
  let params = useParams()

  return (
    <CoffeeContext.Consumer>
      {({ coffee }) => {
        return (
          <div>
            <h1>Coffee List</h1>
            <Link to="/coffee/new">Add New Coffee</Link>
            {console.log(coffee)}
            <div>
              {coffee.map((c) => {
                return (
                  <div key={c.id}>
                    <h2>
                      {c.name} | ${c.price}
                    </h2>
                    <Link to={`/coffee/${c._id}`}>Edit Coffee</Link>
                    <Link to="/coffee/delete">Delete Coffee</Link>
                    <p>{c.description}</p>
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
