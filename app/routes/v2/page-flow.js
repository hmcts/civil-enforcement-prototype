const settings = require('./config')
const csvtojson = require('csvtojson')
const pageFlow = require('./pages.json')
const fs = require('fs')
const csvFile = './app/views/v2/lab-notes.csv'

module.exports = function (router) {
  const version = 'v2'
  const sprint = 5

  router.get(['/' + version + '/page-flow/'], function (req, res) {
    // let pathToCSV = fs.readFileSync(csvFile, 'utf8')
    let csvData = csvtojson().fromFile(csvFile).then((jsonObj) => {
      return jsonObj
    })

    res.render(version + '/page-flow.html',
      {
        pageFlow: pageFlow,
        sprint: sprint,
        csvData: csvData
      }
    )
  })
}
