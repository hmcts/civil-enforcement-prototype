const settings = require('./config')
const common = require('./common')
const csvtojson = require('csvtojson')
const pageFlow = require('./pages.json')
const fs = require('fs')
const csvFile = './app/views/v2/lab-notes.csv'
const csvData = common.csvtojson(csvFile)
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }

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

  router.get(['/' + version + '/page-flow/:stage/:page', '/' + version + '/page-flow/:stage/:subStage/:page'], asyncMiddleware(async (req, res, next) => {
    let theStageKey = req.params.subStage ? req.params.stage + '/' + req.params.subStage : req.params.stage
    // let thisStage = common.findKey(theStageKey, 'location', pageFlow.stages)
    let thisStageIndex = common.findIndex(theStageKey, 'location', pageFlow.stages)
    let thisStage = pageFlow.stages[thisStageIndex]
    let theStagePages = thisStage.versions[0]['pages']
    let thisPageIndex = common.findIndex(req.params.page, 'location', theStagePages)
    let thisPage = theStagePages[thisPageIndex]
    let theStageUR = await common.findCSVKey(csvFile, thisStage.name, 'Stage')
    theStageUR = common.findKey(thisPage.id, 'Type - Email/ dashboard/ application', theStageUR)
    let navigation = {'prev': common.getPageBefore(pageFlow, thisPageIndex, theStagePages, thisStageIndex), 'next': common.getPageAfter(pageFlow, thisPageIndex, theStagePages, thisStageIndex)}
    console.log(navigation)
    res.render(version + '/page-flow-individual.html',
      {
        isPage: true,
        pageFlow: pageFlow,
        location: version + '/' + thisStage.location + '/' + thisPage.location,
        thisPage: thisPage,
        theStageUR: Object.values(theStageUR),
        sprint: sprint,
        csvData: csvData,
        navigation: navigation
      }
    )
  }))
}
