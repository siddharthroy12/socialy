import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { AuthProvider } from './context/auth'
import AuthRoute from './utils/AuthRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import Menubar from './components/Menubar'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Menubar />
        <Route exact path='/' component={Home} />
        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/register' component={Register} />
      </Router>
    </AuthProvider>
  );
}

export default App;
