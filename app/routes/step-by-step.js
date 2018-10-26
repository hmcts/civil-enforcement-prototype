module.exports = function (router) {
  router.get(['/defendant-guidance/step-by-step/overview'], function (req, res) {
    res.render('defendant-guidance/index', {
      stepByStep: true,
      stepByStepSubPage: true
    })
  })
  router.get(['/defendant-guidance/step-by-step/:page'], function (req, res) {
    res.render('defendant-guidance/' + req.params.page, {
      stepByStep: true,
      stepByStepSubPage: true
    })
  })

}
