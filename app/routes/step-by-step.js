module.exports = function (router) {
  router.get(['/defendant-guidance/step-by-step/overview'], function (req, res) {
    var step = req.query.step || 4.1
    res.render('defendant-guidance/index', {
      stepByStep: true,
      stepByStepSubPage: true,
      step: step
    })
  })
  router.get(['/defendant-guidance/step-by-step/:page'], function (req, res) {
    var step = req.query.step
    res.render('defendant-guidance/' + req.params.page, {
      stepByStep: true,
      stepByStepSubPage: true,
      step: step
    })
  })

}
