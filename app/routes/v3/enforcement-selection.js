const settings = require('./config')

module.exports = function (router) {
  const version = 'v3'
  router.post(['/' + version + '/enforcement-selection/', '/' + version + '/enforcement-selection/basic', '/' + version + '/enforcement-selection/bailiffs', '/' + version + '/enforcement-selection/wizard/answers'], function (req, res) {
    let redirect
    if (req.body['known-facts']) {
      if (req.body['known-facts'].includes('nothing')) {
        res.redirect('/' + version + '/enforcement-selection/apply-to-find-out-about-financial-situation')
      } else {
        res.render(version + '/enforcement-selection/index.html', {
          knownFacts: req.body['known-facts']
        })
      }
    } else {
      switch (req.body['enforcement-type']) {
        case 'bailiff' :
          redirect = '/' + version + '/enforcement-selection/bailiffs'
          break
        case 'attachment-of-earnings' :
          redirect = '/' + version + '/claimant-guidance/get-money-deducted-from-wages'
          break
        case 'third-party-debt-order' :
          redirect = '/' + version + '/claimant-guidance/freeze-assets-or-money-in-account'
          break
        case 'charging-order' :
          redirect = '/' + version + '/claimant-guidance/charge-debtors-land-or-property'
          break
        case 'order-to-obtain-information-on-finances' :
          redirect = '/' + version + '/claimant-guidance/order-to-obtain-information-on-finances'
          break
        case 'warrant-of-control' :
          redirect = '/' + version + '/claimant-guidance/send-bailiffs-to-collect-payment#warrant'
          break
        case 'writ-of-control' :
          redirect = '/' + version + '/writs/cmc/1'
          break
        default :
          redirect = '/' + version + '/enforcement-selection/bailiffs'
      }
      res.redirect(redirect)
    }
  })

  router.post(['/' + version + '/enforcement-selection/wizard/', '/' + version + '/enforcement-selection/wizard', '/' + version + '/enforcement-selection/wizard/index'], function (req, res) {
    let answer = req.body['know-enforcement']
    if (answer === 'yes') {
      res.redirect('/' + version + '/enforcement-selection/')
    } else {
      res.redirect('/' + version + '/enforcement-selection/wizard/1')
    }
  })

  router.get(['/' + version + '/enforcement-selection/wizard/1'], (req, res) => {
    res.render(version + '/enforcement-selection/wizard/1.html', {
      defendant: settings.defendant.name,
      debt: settings.claimAmount
    })
  })

  router.post(['/' + version + '/enforcement-selection/wizard/1'], (req, res) => {
    let answer = req.body['can-pay']
    if (answer === 'yes') {
      res.redirect('/' + version + '/enforcement-selection/wizard/2')
    } else if (answer === 'no') {
      res.redirect('/' + version + '/enforcement-selection/')
    } else {
      res.redirect('/' + version + '/enforcement-selection/wizard/1')
    }
  })

  router.get(['/' + version + '/enforcement-selection/wizard/2'], (req, res) => {
    res.render(version + '/enforcement-selection/wizard/2.html', {
      defendant: settings.defendant.name,
      debt: settings.claimAmount
    })
  })

  router.post(['/' + version + '/enforcement-selection/wizard/answers'], (req, res) => {
    let knownFacts = req.body['known-facts']
    res.render(version + '/enforcement-selection/index.html', {
      knownFacts: knownFacts
    })
  })

  router.get('/' + version + '/enforcement-selection/apply-to-find-out-about-financial-situation', (req, res) => {
    res.render(version + '/enforcement-selection/apply-to-find-out-about-financial-situation.html', {
      defendant: settings.defendant.name,
      debt: settings.claimAmount
    })
  })

}
