import './Article.css';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';

const Article = (props) => {

  // This is used to calculate the width of the bar as a percentage of the views of the top ranking page
  const pct = () => scaleLinear().domain([0, props.max]).range([1, 100]).clamp(true);
  console.log(props.max, props.views, pct(props.views));
  const barWidth = Math.ceil(pct()(props.views));

  return (
    <div className="Article">
      <div class="Name">
        <a target="_blank" rel="noreferrer" href={`https://en.wikipedia.org/wiki/${props.article}`}>{props.article.split('_').join(' ')}</a>
      </div>
      <div className="BarContainer">
        <div style={{ width: `${barWidth}%` }} className="Bar"></div>
        <div>{props.views} Views</div>
      </div>
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.string,
  rank: PropTypes.number,
  views: PropTypes.number,
  max: PropTypes.number
}

export default Article;
