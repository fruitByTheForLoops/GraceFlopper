module.exports = function (err, req, res, next) {
  console.error(err)
  console.error(err.stack)
  // this if clause can help us in the future if we do some server-side
  // rendering
  if (err.status === 404) {
    res.status(err.status).send('Oops... resource not found')
  } else {
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  }
}
