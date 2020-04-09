const dev = {
  api: {
    URL: "http://tickets.lesquerra.cat"
  }
};

const prod = {
  api: {
    URL: window.location.protocol + "//" + window.location.hostname + (window.location.protocol === "http:" ? ":8000" : ":8443")
  }
};

const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;

export default {
  // Add common config values here. Example:
  //MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
