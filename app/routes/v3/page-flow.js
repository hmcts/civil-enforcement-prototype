const version = 'v3'
const sprint = 6
const settings = require('./config')
const common = require('./common')
let pageFlow = require('./pages.json')
const userFlow = require('./user-flows.json')
const csvFile = './app/views/' + version + '/page-flow/lab-notes.csv'
// const csvData = common.csvtojson(csvFile)
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }

module.exports = function (router) {
  router.get(['/' + version + '/page-flow/'], function (req, res) {
    // @todo - read from user-flow and convert to 'Page Flow' format?
    res.render('./includes/page-flow.html',
      {
        pageFlow: pageFlow,
        sprint: sprint
      }
    )
  })
  router.get(['/' + version + '/user-flow/'], function (req, res) {
    // @todo - read from user-flow and convert to 'Page Flow' format?
    let theUserFlow = common.pageFlowFromUserFlow(userFlow, pageFlow)
    res.render('./includes/user-flow.html',
      {
        userFlow: theUserFlow,
        sprint: sprint
      }
    )
  })

  router.get(['/' + version + '/page-flow/:stage/:page', '/' + version + '/page-flow/:stage/:subStage/:page'], asyncMiddleware(async (req, res, next) => {

    const SheetsAPI = require('sheets-api')
    const sheets = new SheetsAPI()

    const SPREADSHEET_ID = '1jI3eJF6F7Infl1oyJYreNHzJtPjXT9K8WTUYt5lwbIw'
    const API_KEY = 'AIzaSyBDWsUFLhvbMybu7ZpwIeiwEcex0K4OyNA'
    const SPREADSHEET_URL_DIRECT = 'https://spreadsheets.google.com/feeds/list/' + SPREADSHEET_ID + '/od6/public/values?alt=json'
    const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/gviz/tq?tqx=out:csv'

    // let theCsvData = await common.getUrData(SPREADSHEET_URL, csvData)

    // console.log(theCsvData)

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
    // @todo store API call / CSV UR Data in a session
    let theURData = await common.getUrData(SPREADSHEET_URL, csvFile)
    req.session.theURData = theURData
    let theStageUR = await common.findCSVKey(theURData, thisStage.id, 'Stage')
    theStageUR = common.findKey(thisPage.location, 'Location', theStageUR)
    // @todo navigate based upon the user-flow NOT pages.json
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
        // theStageUR: Object.values(theStageUR),
        theStageUR: theStageUR,
        sprint: sprint,
        // csvData: csvData,
        navigation: navigation,
        hasHistory: hasHistory
      }
    )
  }))
}
