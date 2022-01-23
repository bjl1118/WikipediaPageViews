import './Article.css';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from 'react';

const Article = (props) => {

  const [color, setColor] = useState('#00e676');
  const [showBadge, setShowBadge] = useState(false);

  // This is used to calculate the width of the bar as a percentage of the views of the top ranking page
  const pct = () => scaleLinear().domain([0, props.max]).range([1, 100]).clamp(true);
  const barWidth = Math.ceil(pct()(props.views));

  useEffect(() => {
    // Use separate colors to make the top 3 results stand out
    switch (props.index) {
      case 0:
        setColor('#00b0ff');
        setShowBadge(true);
        break;
      case 1:
        setColor('#00e5ff');
        setShowBadge(true);
        break;
      case 2:
        setColor('#1de9b6');
        setShowBadge(true);
        break;
      default:
        break;
    }
  }, [props.index]);

  return (
    <div className="Article">
      <div className="Name">
        {
          showBadge &&
          <span
            style={{
              borderColor: color,
              color
            }}
            className="Badge">
            <b>{props.index + 1}</b>
          </span>
        }
        <a target="_blank" rel="noreferrer" href={`https://en.wikipedia.org/wiki/${props.article}`}>{props.article.split('_').join(' ')}</a>
      </div>
      <div style={{ color }} className="BarContainer">
        <div
          style={{
            width: `${barWidth}%`,
            backgroundColor: color
          }}
          className="Bar">
        </div>
        <div>{props.views} Views</div>
      </div>
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.string,
  rank: PropTypes.number,
  index: PropTypes.number,
  views: PropTypes.number,
  max: PropTypes.number
}

export default Article;
