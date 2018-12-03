const settings = require('./config')
const common = require('./common')
const csvtojson = require('csvtojson')
const pageFlow = require('./pages.json')
const fs = require('fs')
const csvFile = './app/views/v2/lab-notes.csv'
const csvData = common.csvtojson(csvFile)

module.exports = function (router) {
  const version = 'v2'
  const sprint = 5

  router.get(['/' + version + '/page-flow/'], function (req, res) {
    // console.log(csvData)
    res.render(version + '/page-flow.html',
      {
        pageFlow: pageFlow,
        sprint: sprint,
        csvData: csvData
      }
    )
  })

  router.get(['/' + version + '/page-flow/:stage/:page', '/' + version + '/page-flow/:stage/:subStage/:page'], function (req, res) {
    // console.log(csvData)
    //  thisPage = pageFlow['stages']
    let thisPage = common.findKey(req.params.stage, 'location', pageFlow.stages)
    console.log(thisPage)
    res.render(version + '/page-flow-individual.html',
      {
        isPage: true,
        pageFlow: pageFlow,
        thisPage: thisPage.versions[0],
        sprint: sprint,
        csvData: csvData
      }
    )
  })
}
