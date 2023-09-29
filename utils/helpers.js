module.exports = {
  // Format date as "Month Day, Year" (e.g., "Sep 28, 2023")
  format_date: (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  },

  // Format amount with commas (e.g., 1,000)
  format_amount: (amount) => {
    return parseInt(amount).toLocaleString();
  },

  // Get a random dating-related emoji
  get_emoji: () => {
    const randomNum = Math.random();

    if (randomNum > 0.7) {
      return `<span for="img" aria-label="heart">❤️</span>`;
    } else if (randomNum > 0.4) {
      return `<span for="img" aria-label="rose">🌹</span>`;
    } else {
      return `<span for="img" aria-label="kiss">💋</span>`;
    }
  },
};

