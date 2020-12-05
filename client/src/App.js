import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import { AuthProvider } from './context/auth'
import AuthRoute from './utils/AuthRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'
import Profile from './pages/Profile'

import Menubar from './components/Menubar'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Menubar />
        <Route exact path='/' component={Home} />
        <AuthRoute exact path='/login' component={Login} />
        <AuthRoute exact path='/register' component={Register} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/posts/:postId' component={SinglePost} />
      </Router>
    </AuthProvider>
  );
}

export default App;
