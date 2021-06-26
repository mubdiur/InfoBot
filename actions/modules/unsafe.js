const filter = require('leo-profanity');
filter.loadDictionary();

module.exports = (text) => filter.check(text);