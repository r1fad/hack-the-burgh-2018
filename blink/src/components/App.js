import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../styles/app.css'

import MenuAppBar from './MenuAppBar';

class App extends Component{

  render(){
    const {name, age, id} = this.props.userInfo;
    return(
      <div>
        <MenuAppBar name={name} age={age} id={id} />
      </div>
    )
  }

}

function mapStateToProps(state){
  return state;
}

export default connect(mapStateToProps, null)(App);
