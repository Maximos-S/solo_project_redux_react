import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';
import SignUpFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=> setIsLoaded(true));
  },[dispatch])

  return (
    <main>
      <Navigation />
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignUpFormPage />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
