const version = 'v3'
const sprint = 6
const settings = require('./config')
const common = require('./common')
const pageFlow = require('./pages.json')
const csvFile = './app/views/' + version + '/page-flow/lab-notes.csv'
const csvData = common.csvtojson(csvFile)
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }

module.exports = function (router) {
  router.get(['/' + version + '/page-flow/'], function (req, res) {
    // console.log(csvData)
    res.render('./includes/page-flow.html',
      {
        pageFlow: pageFlow,
        sprint: sprint,
        csvData: csvData
      }
    )
  })

  router.get(['/' + version + '/page-flow/:stage/:page', '/' + version + '/page-flow/:stage/:subStage/:page'], asyncMiddleware(async (req, res, next) => {
    let theStageKey = req.params.subStage ? req.params.stage + '/' + req.params.subStage : req.params.stage
    let thisStageIndex = common.findIndex(theStageKey, 'location', pageFlow.stages)
    let thisStage = pageFlow.stages[thisStageIndex]
    let theStagePages = thisStage.versions[0]['pages']
    let theQueryString = ''
    if (Object.keys(req.query).length) {
      theQueryString = '?'
      for (let i in req.query) {
        theQueryString += i
        theQueryString += '=' + req.query[i]
      }
    }
    let thePageName = req.params.page + theQueryString
    let thisPageIndex = common.findIndex(thePageName, 'location', theStagePages)
    let thisPage = theStagePages[thisPageIndex]
    let theStageUR = await common.findCSVKey(csvFile, thisStage.name, 'Stage')
    theStageUR = common.findKey(thisPage.id, 'Type - Email/ dashboard/ application', theStageUR)
    let navigation = {
      'prev': common.getPageBefore(pageFlow, thisPageIndex, theStagePages, thisStageIndex, version),
      'next': common.getPageAfter(pageFlow, thisPageIndex, theStagePages, thisStageIndex, version)
    }
    let hasHistory = common.getPageHistory(thisPage, thisStage)
    res.render('./includes/page-flow-individual.html',
      {
        isPage: true,
        pageFlow: pageFlow,
        location: version + '/' + thisStage.location + '/' + thisPage.location,
        thisPage: thisPage,
        thisStage: thisStage,
        theStageUR: Object.values(theStageUR),
        sprint: sprint,
        csvData: csvData,
        navigation: navigation,
        hasHistory: hasHistory
      }
    )
  }))
}
