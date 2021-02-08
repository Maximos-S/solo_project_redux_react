import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as portfolioActions from '../../store/portfolio';
import * as watchlistActions from '../../store/watchlist';

const News = ({story}) => {

    

    return (
        <div className="newsArticle">
            <span className="newsHeadline" onClick={() => window.open(story.url, "_blank")}>{story.headline}</span>
            <a href={story.url} target="_blank"><img className="newsImg" src={`${story.image}`} alt="news"/></a>
            <div className="summary">{story.summary}</div>
        </div>
    );
};

News.propTypes = {};

export default News;