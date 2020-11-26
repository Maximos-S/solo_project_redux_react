import {fetch} from './csrf'

const SEARCH_STOCK = 'search/stock';
const SEARCH_CHART = 'search/chart'

const setSearchResult = (stock) => {
    return {
        type: SEARCH_STOCK,
        stock
    }
}

const setChartResult = (chart) => {
    return {
        type: SEARCH_CHART,
        chart
    }
}

export const search = (searchTerm) => (async(dispatch) => {
    const response = await fetch('/api/search', {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({searchTerm})
    })
    dispatch(setSearchResult(response.data.stockData.stock))
    console.log("reducer", response)
    dispatch(setChartResult(response.data.stockData.chartData))
    return response
})

const initialState = { stock: null, chart: null}

const searchReducer = (state = initialState, action) => {
    let newState;

    switch(action.type) {
        case SEARCH_STOCK:
            newState = Object.assign({}, state);
            newState.stock = action.stock;
            return newState;
        case SEARCH_CHART:
            newState = Object.assign({}, state);
            newState.chart = action.chart;
            return newState;
        default:
            return state;
    }
}

export default searchReducer