import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [articles, setArticles] = useState([])

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
      const response = await fetch(
        url('2022', '01', '10'),
      );

      const body = await response.json();
      console.log(body);

      setArticles(body.items[0].articles)
    };

    fetchData();
  }, [])

  return (
    <div className="App">
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
