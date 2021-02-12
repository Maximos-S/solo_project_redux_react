import {fetch} from './csrf'

const SHOW_PORTFOLIO = 'show/portfolio'
const ADJUST_PORTFOLIO = 'add/portfolio'

// const adjustPortfolio = (portfolio) => {
//     return {
//         type: ADJUST_PORTFOLIO,
//         portfolio
//     }
// }

const showPortfolio = (portfolio) => {
    return {
        type: SHOW_PORTFOLIO,
        portfolio
    }
}

export const addToPortfolio = (stock, shares, userId) => (async (dispatch) => {
    const response = await fetch ('/api/portfolio', {
        method: 'Post',
        headers: {'Content': 'application/json'},
        body: JSON.stringify({stock, shares, userId})
    })
    console.log("dispatch",response.data)
    dispatch(getPortfolio(userId))
    return response
})

export const getPortfolio = (userId) => (async (dispatch) => {
    const response = await fetch('/api/users/portfolio', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userId})
    })
    console.log("getPortfolio", response)
    dispatch(showPortfolio(response.data.portfolio))
    return
})
export const sellPortfolio = (stock, shares, userId) => (async (dispatch) => {
    const response = await fetch ('/api/portfolio', {
        method: 'Delete',
        headers: {'Content': 'application/json'},
        body: JSON.stringify({stock, shares, userId})
    })
    dispatch(getPortfolio(userId))
    return response
})

// export const getPortfolio = (userId) => (async (dispatch) => {
//     const response = await fetch('/api/users/portfolio', {
//         method: "POST",
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({userId})
//     })

//     dispatch(showPortfolio(response.data.portfolio))
//     return
// })

const initialState = {portfolio: {}}

const portfolioReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        // case ADJUST_PORTFOLIO:
        //     newState = Object.assign({}, state);
        //     newState.portfolio = action.portfolio;
        //     return newState
        case SHOW_PORTFOLIO:
            newState = Object.assign({}, state);
            newState.portfolio = action.portfolio
            return newState
        default:
            return state;
    }
}

export default portfolioReducer