module.exports = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Insufficient Privileges')
    error.status = 401
    next(error)
  }
}
