import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as portfolioActions from '../../store/portfolio';
import * as watchlistActions from '../../store/watchlist';

const News = ({story}) => {

    return (
        <div>
            {story.summary}
        </div>
    );
};

News.propTypes = {};

export default News;