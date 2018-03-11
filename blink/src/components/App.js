import React, { Component } from 'react';
import '../styles/app.css'

import MenuAppBar from './MenuAppBar';
import SimpleCard from './SimpleCard';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: {},
      isLoading: true
    }
  }

  componentDidMount(){
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele){
      fetch('https://hacktheburgh-186fa.firebaseio.com/.json',{
        method: 'get',
        mode: 'cors',
        headers : {
          'content-type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => console.log(data))
      // .then(data=>this.setState({data:data, isLoading: false}))
      .then(() => ele.outerHTML = '')
    }
  }

  render(){
    const { userData, eyeStats } = this.state.data;
    if (this.state.isLoading){
      return null;
    }
    return(
      <div>
        <MenuAppBar data={userData} />
        <div className="card-data">
          <SimpleCard data={eyeStats} />
        </div>

      </div>
    )
  }
}

export default App;
