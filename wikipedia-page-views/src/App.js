import { useEffect, useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [articles, setArticles] = useState([])
  const [date, setDate] = useState(moment().subtract(10, 'days').toDate());

  /**
   * Creates the URL to send requests to using year, month, and day as params
   * 
   * @param {string} year: The year
   * @param {string} month: The month
   * @param {string} day : The day
   * @returns The wikimedia url with the params added in
   */
  const url = (year, month, day) => `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`

  useEffect(() => {
    const fetchData = async () => {
      const year = moment(date).format('yyyy')
      const month = moment(date).format('MM')
      const day = moment(date).format('DD')
      const response = await fetch(
        url(year, month, day),
      );

      const body = await response.json();
      console.log(body);

      setArticles(body.items[0].articles)
    };

    fetchData();
  }, [date])

  return (
    <div className="App">
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)} />
      <ul>
        {articles.map(article => (
          <li key={article.article}>
            <a target="_blank" rel="noreferrer" href={`https://en.wikipedia.org/wiki/${article.article}`}>{article.article}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
