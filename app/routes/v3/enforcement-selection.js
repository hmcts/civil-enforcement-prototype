module.exports = function (router) {
  const version = 'v3'
  router.post(['/' + version + '/enforcement-selection/', '/' + version + '/enforcement-selection/basic', '/' + version + '/enforcement-selection/bailiffs'], function (req, res) {
    let redirect
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
  })
}
