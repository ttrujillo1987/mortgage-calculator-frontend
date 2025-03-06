import { useState } from "react";

const MortgageNewsSection = () => {
  const [news, setNews] = useState([]);
  const [isNewsVisible, setIsNewsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMortgageNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=mortgage&searchIn=title&language=en&sortBy=publishedAt&pageSize=5&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      const data = await response.json();
      setNews(data.articles || []);
    } catch (error) {
      console.error("Error fetching mortgage news:", error);
    } finally {
      setLoading(false);
      setIsNewsVisible(true);
    }
  };

  return (
    <div>
        <div className="text-center pt-8">
            <button onClick={fetchMortgageNews} className="mx-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-950 text-white">
            {isNewsVisible ? "Refresh News" : "Show Latest Mortgage News"}
            </button>
        </div>

      {loading && <p>Loading news...</p>}

      {isNewsVisible && !loading && (
        <div>
        <h2 className="mt-4 text-2xl font-semibold text-center mb-4"> Home Affordability Summary</h2>
          {news.length > 0 ? (
            <ul>
              {news.map((article, index) => (
                <li className="py-2" key={index}>
                  <strong><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></strong>
                  <p><em>{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</em></p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No mortgage news found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MortgageNewsSection;
