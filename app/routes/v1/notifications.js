module.exports = function (router) {
  const version = 'v1'
  router.get(['/' + version + '/notifications/claimant/:email'], function (req, res) {
    let phoneAlert = req.query.phoneAlert || false
    res.render(version + '/notifications/claimant/' + req.params.email + '.html', {
      phoneAlert: phoneAlert
    })
  })
  // Various documents
  router.get(['/' + version + '/documents/:document'], function (req, res) {
    let document = req.params.document || false
    let sprint = 4
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
