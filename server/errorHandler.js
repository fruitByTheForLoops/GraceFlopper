const path = require('path')
module.exports = function (err, req, res, next) {
  console.error(err)
  console.error(err.stack)
  if (err.status === 404) {
    res
      .status(err.status)
      .sendFile(path.join(__dirname, '..', 'public/index.html'))
  } else {
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  }
}
