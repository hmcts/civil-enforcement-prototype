const settings = require('./config')

module.exports = function (router) {
  const version = 'v3'
  router.get(['/' + version + '/notifications-claimant/:email'], function (req, res) {
    let phoneAlert = req.query.phoneAlert || false
    let defendant = req.query.defendant || settings.defendant.name
    let claimant = req.query.claimant || settings.claimant.name
    let claimNumber = req.query.claimNumber || settings.claimNumber
    res.render(version + '/notifications-claimant/' + req.params.email + '.html', {
      phoneAlert: phoneAlert,
      defendant: defendant,
      claimant: claimant,
      claimNumber: claimNumber
    })
  })
  router.get(['/' + version + '/notifications-defendant/:email'], function (req, res) {
    let phoneAlert = req.query.phoneAlert || false
    let defendant = req.query.defendant || settings.defendant.name
    let claimant = req.query.claimant || settings.claimant.name
    let claimNumber = req.query.claimNumber || settings.claimNumber
    res.render(version + '/notifications-defendant/' + req.params.email + '.html', {
      phoneAlert: phoneAlert,
      defendant: defendant,
      claimant: claimant,
      claimNumber: claimNumber
    })
  })
  // Various documents
  router.get(['/' + version + '/documents/:document'], function (req, res) {
    let document = req.params.document || false
    let sprint = 6
    let directory = '/public/pdf/sprint' + sprint + '/'
    let redirect
    switch (document) {
      case 'writ':
        redirect = 'Writ of control.pdf'
        break
      case 'noe':
        redirect = 'NoE letter.pdf'
        break
      case 'ccj-letter':
        redirect = 'CCJ letter.pdf'
        break
    }
    // console.log(directory + redirect)
    res.redirect(directory + redirect)
  })
}
