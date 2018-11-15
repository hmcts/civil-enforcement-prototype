module.exports = function (router) {
  const version = 'v1'
  router.get(['/' + version + '/defendant-guidance/step-by-step/overview'], function (req, res) {
    var step = req.query.step || 4.1
    var stepCat = step.toString().substr(0, 1)
    var stepSubCat = step.toString().slice(2)
    res.render(version + '/defendant-guidance/index', {
      stepByStep: true,
      stepByStepSubPage: true,
      stepCat: stepCat,
      stepSubCat: stepSubCat
    })
  })
  router.get(['/' + version + '/defendant-guidance/step-by-step/:page'], function (req, res) {
    var step = req.query.step || 0.0
    var stepCat = step.toString().substr(0, 1)
    var stepSubCat = step.toString().slice(2)
    res.render(version + '/defendant-guidance/' + req.params.page, {
      stepByStep: true,
      stepByStepSubPage: true,
      stepCat: stepCat,
      stepSubCat: stepSubCat
    })
  })
}
