import {fetch} from './csrf'

const SEARCH_STOCK = 'search/stock';

const setSearchResult = (stock) => {
    return {
        type: SEARCH_STOCK,
        stock
    }
}

export const search = (searchTerm) => (async(dispatch) => {
    const response = await fetch('/api/search', {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({searchTerm})
    })
    console.log("response", response.data.stock.quote)
    dispatch(setSearchResult(response.data.stock.quote))
    return response
})

const initialState = { stock: null}

const searchReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case SEARCH_STOCK:
            newState = Object.assign({}, state);
            newState.stock = action.stock;
            console.log(newState)
            return newState;
        default:
            return state;
    }
}

export default searchReducer