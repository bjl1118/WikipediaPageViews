import './Article.css';
import PropTypes from 'prop-types'

const Article = (props) => {
  return (
    <div className="Article">
      <a target="_blank" rel="noreferrer" href={`https://en.wikipedia.org/wiki/${props.article}`}>{props.article}</a>
    </div>
  );
}

Article.propTypes = {
  article: PropTypes.string,
  rank: PropTypes.number,
  views: PropTypes.number,
  percent: PropTypes.number
}

export default Article;
