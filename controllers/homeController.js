const functions = require('../public/lib/checkUserInput')

const funcString = Object.keys(functions).reduce((previous, key) => {
    return previous + functions[key].toString();
}, "");

module.exports = (req, res) => {
  res.render('index', {checkUserInput: funcString})
}
