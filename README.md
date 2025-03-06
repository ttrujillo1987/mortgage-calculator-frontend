# Home Purchase Affordability Calculator - Frontend

This is the frontend for the Home Purchase Affordability Calculator, a tool that helps users estimate how much house they can afford based on their financial situation.

## Features
- Step-by-step input flow for user-friendly data entry
- Dynamic affordability calculations based on user inputs
- Pie chart visualization of mortgage payment breakdown
- ~Latest mortgage news fetched via NewsAPI~ Removed for now due to NewsAPI CORS only allowing localhost on Developer tier
- Responsive design using Tailwind CSS

## Tech Stack
- **Frontend Framework**: React.js
- **State Management**: React Hooks
- **Styling**: Tailwind CSS
- **Charting**: Recharts
- **API Calls**: Fetch API

## Getting Started
### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/frontend.git
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The app should now be running at `http://localhost:3000/`.

### Environment Variables
Create a `.env` file in the project root and add:
```
REACT_APP_NEWS_API_KEY=your_api_key_here
```
Replace `your_api_key_here` with your actual NewsAPI key.

## Project Structure
```
frontend/
│── src/
│   ├── components/        # Reusable components
│   ├── pages/             # Application pages
│   ├── utils/             # Helper functions
│   ├── assets/            # Images and icons
│   ├── App.js             # Main application component
│   ├── index.js           # Entry point
│── public/                # Static assets
│── tailwind.config.js     # Tailwind configuration
│── package.json          # Project dependencies
│── .env                  # Environment variables
```

## Usage
1. Enter financial details step by step.
2. View estimated home affordability on the summary page.
3. Edit values on the summary page for real-time updates.
4. ~Click "Show Latest Mortgage News" to fetch news articles.~

## Deployment
To build for production, run:
```sh
npm run build
```

