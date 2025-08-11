const { useState } = React;

// List of quotes
const quotes = [
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "You have within you right now, everything you need to deal with whatever the world can throw at you.", author: "Brian Tracy" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
];

// List of random colors for background
const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#F4D03F", "#8E44AD", "#F39C12", "#2C3E50", "#1ABC9C",
];

// Function to get a random quote and random color
const getRandomQuoteAndColor = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return { randomQuote, randomColor };
};

const App = () => {
  const [quote, setQuote] = useState(getRandomQuoteAndColor().randomQuote);
  const [color, setColor] = useState(getRandomQuoteAndColor().randomColor);

  // Handle new quote and color change
  const handleNewQuote = () => {
    const { randomQuote, randomColor } = getRandomQuoteAndColor();
    setQuote(randomQuote);
    setColor(randomColor);
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundColor: color,
        transition: "background-color 1s ease", // Smooth transition for background color
      }}
    >
      <div id="quote-box" style={styles.quoteBox}>
        <p
          id="text"
          style={{
            ...styles.text,
            color: "#000000", // Text color always black
            transition: "color 1s ease", // Smooth transition for text color (though it will stay black)
          }}
        >
          "{quote.text}"
        </p>
        <p
          id="author"
          style={{
            ...styles.author,
            color: "#000000", // Text color always black
            transition: "color 1s ease", // Smooth transition for author text color
          }}
        >
          - {quote.author}
        </p>
        <div style={styles.buttons}>
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${quote.text}" - ${quote.author}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.tweetButton}
          >
            Tweet
          </a>
          <button
            id="new-quote"
            onClick={handleNewQuote}
            style={styles.newQuoteButton}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Open Sans', sans-serif", // Set font for better readability
  },
  quoteBox: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    maxWidth: "600px",
    width: "90%",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  text: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    transition: "color 1s ease",
  },
  author: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    transition: "color 1s ease",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  tweetButton: {
    backgroundColor: "#1DA1F2",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    textDecoration: "none",
  },
  newQuoteButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

ReactDOM.render(<App />, document.getElementById("root"));
