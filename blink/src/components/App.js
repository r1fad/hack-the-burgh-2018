import React, { Component } from 'react';
import '../styles/app.css';
import Card, { CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid'
import { AreaChart, Area, YAxis, Tooltip, XAxis } from 'recharts';
import Typography from 'material-ui/Typography';
import { values, mapValues, sumBy } from 'lodash';

import MenuAppBar from './MenuAppBar';
import SimpleCard from './SimpleCard';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';

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
      fetch('https://hacktheburgh-186fa.firebaseio.com/processed.json',{
        method: 'get',
        mode: 'cors',
        headers : {
          'content-type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then(jsonData => values(jsonData))
      .then(jsonData => jsonData.map((obj, index) => {
        return { interval: index, count: parseInt(obj.count) }
      }))
      .then(data =>this.setState({ data: data, isLoading: false }))
      .then(blabla => console.log(this.state))
      .then(() => ele.outerHTML = '')
    }
  }

  render(){
    // const { userData, eyeStats } = this.state.data;
    if (this.state.isLoading){
      return null;
    }

    const { data } = this.state;
    const averageBlink = (sumBy(data, obj => obj.count) / (data.length * 10)) * 60 || 'N/A';

    return(
      <div style={{ flexGrow: 1 }}>
        <MenuAppBar />

      <div className = 'cards'>
        <SimpleCard title='Profile'>
          <Typography variant="headline" component="h2">
            Hendrik Mölder
          </Typography>
        </SimpleCard>
        <SimpleCard title='Calories burned'>
          <Typography variant='headline' component='h2'>
            {sumBy(data, obj => obj.count) * 0.003} cal
          </Typography>
        </SimpleCard>
        <SimpleCard title='Eye Health Status'>
          <Typography
            variant='headline'
            component='h2'
            style={averageBlink > 70 ? {color: 'orange'} :
                    (averageBlink < 55 ? {color: 'red'} : {color: 'green'})}
            >
            {averageBlink > 70 ? 'BLINK LESS' :
            (averageBlink < 55 ? 'BLINK MORE' : 'NORMAL')}
          </Typography>
        </SimpleCard>
      </div>

        <div className = 'graph'>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title='Blinks'
                subtitle='Per 10 Second Interval'
              />
              <ResponsiveContainer width='100%' height={500}>
                <AreaChart data={data}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <Tooltip />
                  <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  </defs>
                  <XAxis label = "Time" />
                  <YAxis datakey='count'/>
                  <Area type='monotone' dataKey='count' stroke='#8884d8' fillOpacity={1} fill='url(#colorUv)' />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </Grid>
        </Grid>
        </div>
      </div>
    )
  }
}

export default App;
