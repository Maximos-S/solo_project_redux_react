import {fetch} from './csrf'

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser'

const setSessionUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}
const removeSessionUser = () => {
    return {
        type: REMOVE_USER,
    }
}

export const login = (user) => ( async (dispatch) => {
    const {credential, password} = user;
    const response = await fetch('/api/session',
        {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({credential,password})
        });
    dispatch(setSessionUser(response.data.user))
    return response;
})

const initialState = { user: null}

const sessionReducer = (state = initialState, action) => {

    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;

    }
}

export default sessionReducer