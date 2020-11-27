import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as portfolioActions from '../../store/portfolio';
import * as watchlistActions from '../../store/watchlist';

const News = ({story}) => {

    return (
        <div className="newsArticle">
            <img className="newsImg" src={`${story.image}`} alt="news"/>
            <div className="summary">{story.summary}</div>
        </div>
    );
};

News.propTypes = {};

export default News;