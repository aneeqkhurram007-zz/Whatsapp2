import { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Chat from './components/Chats/Chat';
import Sidebar from './components/Siderbar/Sidebar';
import Login from './Login/Login';
import { useStateValue } from './StateProvider'
import { auth } from './Firebase/firebase'
import { onAuthStateChanged } from '@firebase/auth'
function App() {

  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: "SET_USER",
        user: user
      })
    })
  }, [dispatch])
  return (
    <BrowserRouter>
      <Switch>
        {!user ? (<Login />) :
          <div className="App">
            <div className="app__body">
              <Sidebar />
              <Route path="/" exact component={Chat} />
              <Route path="/room/:roomID" component={Chat} />

            </div>
          </div>
        }
      </Switch>
    </BrowserRouter>
  );
}

export default App;
