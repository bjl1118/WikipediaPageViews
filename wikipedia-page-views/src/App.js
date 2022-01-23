import { useEffect, useState } from 'react';
import moment from 'moment';
import Article from './components/Article';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [articles, setArticles] = useState([])
  const [date, setDate] = useState(moment().subtract(10, 'days').toDate());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  /**
   * Creates the URL to send requests to using year, month, and day as params
   * 
   * @param {string} year: The year
   * @param {string} month: The month
   * @param {string} day : The day
   * @returns The wikimedia url with the params added in
   */
  const url = (year, month, day) => `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`

  const hasArticles = (body) => body.items && body.items[0] && body.items[0].articles;

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      const year = moment(date).format('yyyy')
      const month = moment(date).format('MM')
      const day = moment(date).format('DD')
      try {
        const response = await fetch(
          url(year, month, day),
        );
        const body = await response.json();
        if (hasArticles(body)) {
          // Filter out "Main_Page" and "Special:Search" from results. This is because they
          // are generally viewed much higher than other pages, and don't tell a particularly 
          // interesting story
          const articles = body.items[0].articles.filter(article => {
            return article.article !== 'Main_Page' && article.article !== 'Special:Search'
          })
          setArticles(articles)
        } else {
          setIsError(true);
        }
      } catch {
        setIsError(true);
      }
      setIsLoading(false)
    };

    fetchData();
  }, [date])

  return (
    <div className="App">
      <div className="Content">
        <div className="DatePickerContainer">
          <span className='DatePickerLabel'>
            What were the most viewed Wikipedia Pages on...
          </span>
          <DatePicker
            selected={date}
            showPopperArrow={false}
            onChange={(date) => setDate(date)}
          />
        </div>
        <div className="Results">
          {
            isLoading ?
              <div>Loading...</div> :
              <div>
                {
                  isError ?
                    <div>Something went wrong ...</div> :
                    <div className="ArticlesList">
                      {articles.map(article => (
                        <Article
                          key={`${date}${article.article}`}
                          article={article.article}
                          rank={article.rank}
                          views={article.views}
                          // Pass in the top ranking views so we can calculate the bar width
                          max={articles[0].views}
                        />
                      ))}
                    </div>
                }
              </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
