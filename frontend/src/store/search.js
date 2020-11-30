import {fetch} from './csrf'

const SEARCH_STOCK = 'search/stock';
const SEARCH_CHART = 'search/chart'
const SEARCH_NEWS = 'search/news'

export const setSearchResult = (stock) => {
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

const setNewsResult = (news) => {
    return {
        type: SEARCH_NEWS,
        news
    }
}

export const search = (searchTerm, portfolioId) => (async(dispatch) => {
    const response = await fetch('/api/search', {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({searchTerm, portfolioId})
    })
    dispatch(setSearchResult(response.data.stockData.stock))
    dispatch(setChartResult(response.data.stockData.chartData))
    dispatch(setNewsResult(response.data.stockData.news))
    return response
})

const initialState = { stock: null, chart: null, news: null}

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
        case SEARCH_NEWS:
            newState = Object.assign({}, state);
            newState.news = action.news;
            return newState;
        default:
            return state;
    }
}

export default searchReducer