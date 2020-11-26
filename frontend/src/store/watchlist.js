import {fetch} from './csrf'

const SHOW_WATCHLIST = 'show/watchlist'

const showWatchlist = (watchlist) => {
    return {
        type: SHOW_WATCHLIST,
        watchlist
    }
}

export const addToWatchlist = (stock, userId) => (async (dispatch) => {
    const response = await fetch ('/api/watchlist', {
        method: 'Post',
        headers: {'Content': 'application/json'},
        body: JSON.stringify({stock, userId})
    })
    dispatch(showWatchlist(response.data.watchlist))
    return response
})


export const getWatchlist = (userId) => (async (dispatch) => {
    const response = await fetch('/api/users/watchlist', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId})
    })

    dispatch(showWatchlist(response.data.watchlist))
    return
})
export const remove = (stockId, userId) => (async (dispatch) => {
  const response = await fetch ('/api/watchlist', {
        method: 'Delete',
        headers: {'Content': 'application/json'},
        body: JSON.stringify({stockId, userId})
    })
    dispatch(showWatchlist(response.data.watchlist))
    return response
})


const initialState = {watchlist: {}}

const watchlistReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case SHOW_WATCHLIST:
            newState = Object.assign({}, state);
            newState.watchlist = action.watchlist
            return newState
        default:
            return state;
    }
}

export default watchlistReducer