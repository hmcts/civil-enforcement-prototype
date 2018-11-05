module.exports = function (router) {
  router.get(['/dashboard/case-alt'], function (req, res) {
    var enforcement = req.query.enforcement || false
    console.log(enforcement)
    res.render('dashboard/case-alt.html', {
      enforcement: enforcement
    })
  })
}
