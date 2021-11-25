import React from 'react';
import axios from 'axios';
import Filter from './Filter'

export default class Home extends React.Component {

  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/product`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
    }

render () {

  let personList = this.state.persons.map(person =>{
    return(

    <div className="card" key={person.id}>
    <div className="card-image">
      <img src={person.image} alt={person.name} />
    <span to="/" className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></span>

        </div>

        <div className="card-content">
                <h5>{person.name}</h5>
                <p><b>Price: ${person.price}</b></p>
                    </div>
        </div>

            )
        })

        return(
                   <div>
                   < Filter />
                    <div className="container">
                        <div className="box">
                            {personList}
                        </div>
                        </div>
                    </div>


                )
            }
        }
