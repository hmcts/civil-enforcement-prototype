const settings = require('./config')

module.exports = function (router) {
  const version = 'v3'
  router.post(['/' + version + '/enforcement-selection/', '/' + version + '/enforcement-selection/basic', '/' + version + '/enforcement-selection/bailiffs', '/' + version + '/enforcement-selection/wizard/options', '/' + version + '/enforcement-selection/wizard/choose-method'], function (req, res) {
    let redirect
    let sess = req.session
    if (req.body['known-facts']) {
      if (req.body['known-facts'].includes('nothing')) {
        res.redirect('/' + version + '/enforcement-selection/apply-to-find-out-about-financial-situation')
      } else {
        sess.knownFacts = req.body['known-facts']
        res.render(version + '/enforcement-selection/wizard/options.html', {
          defendant: settings.defendant.name,
          dontKnow: sess.dontKnow,
          knownFacts: sess.knownFacts
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
        case 'orderToObtainInformation' :
          redirect = '/' + version + '/claimant-guidance/order-to-obtain-information-on-finances'
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

  router.get(['/' + version + '/enforcement-selection/bailiffs'], (req, res) => {
    res.render(version + '/enforcement-selection/bailiffs-alt')
  })

  router.get(['/' + version + '/enforcement-selection/wizard/choose-method'], (req, res) => {
    let sess = req.session
    res.render(version + '/enforcement-selection/wizard/choose-method', {
      defendant: settings.defendant.name,
      knownFacts: sess.knownFacts,
      dontKnow: sess.dontKnow
    })
  })

  router.post(['/' + version + '/enforcement-selection/wizard/', '/' + version + '/enforcement-selection/wizard', '/' + version + '/enforcement-selection/wizard/index'], function (req, res) {
    let answer = req.body['know-enforcement']
    if (answer === 'no') {
      res.render(version + '/enforcement-selection/wizard/ccj-paid', {
        defendant: settings.defendant.name,
        amount: settings.claimAmount
      })
    } else {
      res.redirect('/' + version + '/enforcement-selection/')
    }
  })

  router.post(['/' + version + '/enforcement-selection/wizard/ccj-paid'], function (req, res) {
    let answer = req.body['ccjPaid']
    let sess = req.session
    sess.amount = parseFloat(settings.claimAmount)
    if (answer === 'no') {
      res.redirect('/' + version + '/enforcement-selection/wizard/1')
    } else {
      console.log(parseInt(settings.claimAmount))
      console.log(req.body.amountPaid)
      sess.amount -= req.body.amountPaid
      console.log(sess.amount)
      res.render(version + '/enforcement-selection/wizard/1', {
        defendant: settings.defendant.name,
        amount: sess.amount
      })
    }
  })

  router.get(['/' + version + '/enforcement-selection/wizard/1'], (req, res) => {
    res.render(version + '/enforcement-selection/wizard/1.html', {
      defendant: settings.defendant.name,
      amount: req.session.amount
    })
  })

  router.post(['/' + version + '/enforcement-selection/wizard/1'], (req, res) => {
    let answer = req.body['can-pay']
    let sess = req.session
    if (answer === 'yes') {
      res.redirect('/' + version + '/enforcement-selection/wizard/2')
    } else if (answer === 'no') {
      sess.amount = req.body.amount
      res.redirect('/' + version + '/enforcement-selection/apply-to-find-out-about-financial-situation')
    } else {
      sess.dontKnow = true
      res.redirect('/' + version + '/enforcement-selection/wizard/2')
    }
  })

  router.get(['/' + version + '/enforcement-selection/wizard/2'], (req, res) => {
    res.render(version + '/enforcement-selection/wizard/2-alt.html', {
      defendant: settings.defendant.name,
      debt: settings.claimAmount
    })
  })

  router.post(['/' + version + '/enforcement-selection/wizard/answers'], (req, res) => {
    let knownFacts = req.body['known-facts']
    console.log(123)
    res.render(version + '/enforcement-selection/options.html', {
      knownFacts: knownFacts
    })
  })

  router.get(['/' + version + '/enforcement-selection/wizard/options'], (req, res) => {
    let sess = req.session
    res.render(version + '/enforcement-selection/wizard/options.html', {
      defendant: settings.defendant.name,
      dontKnow: sess.dontKnow,
      debt: settings.claimAmount
    })
  })

  router.get('/' + version + '/enforcement-selection/apply-to-find-out-about-financial-situation', (req, res) => {
    res.render(version + '/enforcement-selection/apply-to-find-out-about-financial-situation.html', {
      defendant: settings.defendant.name,
      debt: settings.claimAmount
    })
  })

}
