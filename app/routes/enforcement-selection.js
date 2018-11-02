module.exports = function (router) {
  router.post(['/enforcement-selection/', '/enforcement-selection/basic', '/enforcement-selection/bailiffs'], function (req, res) {
    var redirect
    switch (req.body['enforcement-type']) {
      case 'bailiff' :
        redirect = '/enforcement-selection/bailiffs'
        break
      case 'attachment-of-earnings' :
        redirect = '/claimant-guidance/get-money-deducted-from-wages'
        break
      case 'third-party-debt-order' :
        redirect = '/claimant-guidance/freeze-assets-or-money-in-account'
        break
      case 'charging-order' :
        redirect = '/claimant-guidance/charge-debtors-land-or-property'
        break
      case 'order-to-obtain-information-on-finances' :
        redirect = '/claimant-guidance/order-to-obtain-information-on-finances'
        break
      case 'warrant-of-control' :
        redirect = '/claimant-guidance/send-bailiffs-to-collect-payment#warrant'
        break
      case 'writ-of-control' :
        redirect = '/writs/'
        break
      default :
        redirect = '/enforcement-selection/bailiffs'
    }
    res.redirect(redirect)
  })
}
