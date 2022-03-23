module.exports = {
  initLowercase: (str) => str.charAt(0).toLowerCase() + str.slice(1),
  truncate: (str, maxLength) => {
    return str.length > maxLength ? `${str.substring(0, maxLength)} ...` : str;
  },
  toDateTimeString: (string) => {
    const dateObj = new Date(string);
    return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
  }
};
