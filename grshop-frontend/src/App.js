import Navbar from './components/Navbar'
import Home from './components/Home'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
<div className="App">
   <Navbar />
   <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/cart" />
    </Switch>
    <footer>
      <center>
          <p>GRshop SRL, derechos reservados - 2021</p>
          </center>
    </footer>
</div>
    </BrowserRouter>
  );
}

export default App;
