import React, { Component } from 'react';
import '../styles/app.css'

import MenuAppBar from './MenuAppBar';

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
      fetch('http://127.0.0.1:5000/userdata',{
        method: 'get',
        mode: 'cors'
      })
      .then(response => response.json())
      .then(data=>this.setState({data:data, isLoading: false}))
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
      </div>
    )
  }
}

export default App;
