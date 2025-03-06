const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=mortgage&pageSize=5&language=en&searchIn=title&sortBy=publishedAt&apiKey=${API_KEY}`;

export const fetchMortgageNews = async () => {
    console.log(API_KEY);
  try {
    const response = await fetch(NEWS_API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch mortgage news");
    }
    const data = await response.json();
    return data.articles.slice(0, 5); // Return only the top 5 articles
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
