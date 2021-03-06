import React, {useState, useEffect} from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';
import SignUpFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import { fetch } from './store/csrf';
import Stock from './components/Stock';
import Main from './components/MainComponent';
import Partition from './components/LoginFormPage/Partition';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loginRevealed, setLoginRevealed] = useState(true)
  const [signupRevealed, setSignupRevealed] = useState(false)

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(()=> setIsLoaded(true))
  },[dispatch])

  return (
    <main>
      {!isLoaded ? <div className="loading">loading...</div> :
        !sessionUser ? 
          <div className="user-auth-page">
            <LoginFormPage 
              loginRevealed={loginRevealed} 
              setLoginRevealed={setLoginRevealed}
              signupRevealed={signupRevealed}
              setSignupRevealed={setSignupRevealed}
            />
            <Partition />
            <SignUpFormPage
              loginRevealed={loginRevealed} 
              setLoginRevealed={setLoginRevealed}
              signupRevealed={signupRevealed}
              setSignupRevealed={setSignupRevealed}
            />
          </div> 
          :
          <>
            <Navigation />
            <Main />
            {/* <Switch>
              <Route path='/login'>
                <LoginFormPage />
              </Route>
              <Route path='/signup'>
                <SignUpFormPage />
              </Route>
            </Switch> */}
          </>
} 
    </main>
  );
}

export default App;
