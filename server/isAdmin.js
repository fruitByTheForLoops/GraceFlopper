module.exports = (req, res, next) => {
  console.log('The User --> ', req.user)
  console.log('isAdmin --> ', req.user.isAdmin)
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error('Insufficient Privileges')
    error.status = 401
    next(error)
  }
}
