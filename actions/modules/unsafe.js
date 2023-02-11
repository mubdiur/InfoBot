const filter = require('leo-profanity');
filter.loadDictionary("en");

module.exports = (text) => filter.check(text);