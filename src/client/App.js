import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import io from 'socket.io-client'
import { Provider } from 'react-redux'
import store from './store'

import './App.css'
import About from './components/about/about'
import MealsPage from './pages/meals'

export default class App extends React.Component {
	componentDidMount () {
		io.connect("45.33.42.177:5000")
	}

  render() {
    return (
      <Provider store={store} className="App">
				<div>
        	<header className="App-header">Meal Planning App</header>
      		<Router>
						<Switch>
							<Route exact path="/" component={()=><div>Home</div>}/>
							<Route path="/about" component={About}/>
							<Route path="/meals" component={MealsPage}/>
						</Switch>
					</Router>  
				</div>
      </Provider>
    )
  }
}

