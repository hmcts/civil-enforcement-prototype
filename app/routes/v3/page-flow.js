const version = 'v3'
const sprint = 6
const settings = require('./config')
const common = require('./common')
let pageFlow = require('./pages.json')
const userFlow = require('./user-flows.json')
const userNeeds = require('./user-needs.json')
const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }

module.exports = function (router) {
  router.get(['/' + version + '/page-flow/'], function (req, res) {
    res.render('./includes/page-flow.html',
      {
        pageFlow: pageFlow,
        sprint: sprint
      }
    )
  })
  router.get(['/' + version + '/user-flow/'], function (req, res) {
    let theUserFlow = common.pageFlowFromUserFlow(userFlow, pageFlow)
    res.render('./includes/user-flow.html',
      {
        userFlow: theUserFlow,
        userNeeds: theUserFlow.needs,
        sprint: sprint
      }
    )
  })

  router.get(['/' + version + '/page-flow/:stage/:page', '/' + version + '/page-flow/:stage/:subStage/:page', '/' + version + '/user-flow/:userType/:stage/:page', '/' + version + '/user-flow/:userType/:stage/:subStage/:page'], asyncMiddleware(async (req, res, next) => {
    let flowType = req.path
    let userType = req.params.userType || false
    if (flowType.includes('page-flow')) {
      flowType = 'page-flow'
    } else {
      flowType = 'user-flow'
    }
    const SPREADSHEET_ID = userFlow['journeys'][common.findIndex(userType, 'userType', userFlow['journeys'])]['sheetsId']
    const theCsvFile = userFlow['journeys'][common.findIndex(userType, 'userType', userFlow['journeys'])]['urCsv']
    let urCsv = './app/views/' + version + '/page-flow/' + theCsvFile
    const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/gviz/tq?tqx=out:csv'
    let theQueryString = ''
    if (Object.keys(req.query).length) {
      theQueryString = '?'
      let i = 0
      for (let theKey in req.query) {
        if (i > 0) {
          theQueryString += '&'
        }
        theQueryString += theKey
        theQueryString += '=' + req.query[theKey]
        i++
      }
    }
    let thePageName = req.params.page + theQueryString
    let theStageKey = req.params.stage
    let thisStageIndex = common.findIndex(theStageKey, 'location', pageFlow.stages)
    if (thisStageIndex === false) {
      let theStageKey = req.params.stage + '/' + req.params.subStage
      thisStageIndex = common.findIndex(theStageKey, 'location', pageFlow.stages)
    }
    let thisStage = pageFlow.stages[thisStageIndex]
    let theStageId = thisStage.id
    let journeyIndex = common.findIndex(req.params.userType, 'userType', userFlow['journeys'])
    let versionToUse = userFlow['journeys'][journeyIndex]['flow'][common.findIndexUsing2Keys(thePageName, 'location', theStageId, 'stage', userFlow['journeys'][journeyIndex]['flow'])]['version']
    let theStageVersion = common.findIndex(versionToUse, 'version', thisStage.versions)
    let theStagePages = thisStage.versions[theStageVersion]['pages']
    let thisPageIndex = common.findIndex(thePageName, 'location', theStagePages)
    let thisPage = theStagePages[thisPageIndex]
    // @todo store API call / CSV UR Data in a session
    let theURData = await common.getUrData(SPREADSHEET_URL, urCsv)
    req.session.theURData = theURData
    let theStageUR = await common.findCSVKey(theURData, thisStage.id, 'Stage')
    theStageUR = common.findKey(thisPage.location, 'Location', theStageUR)
    let navigation
    if (flowType === 'page-flow') {
      navigation = {
        'prev': common.getPageBefore(pageFlow, thisPageIndex, theStagePages, thisStageIndex, version),
        'next': common.getPageAfter(pageFlow, thisPageIndex, theStagePages, thisStageIndex, version)
      }
    } else {
      let next = common.getPageAfterUserFlow(userFlow, common.findIndex(userType, 'userType', userFlow.journeys), common.getIndexInUserFlow(userType, thisPage['id'], thisStage['id'], userFlow))
      if (next !== false) {
        next = '/' + version + '/user-flow/' + userType + '/' + next
      }
      let prev = common.getPageBeforeUserFlow(userFlow, common.findIndex(userType, 'userType', userFlow.journeys), common.getIndexInUserFlow(userType, thisPage['id'], thisStage['id'], userFlow))
      if (prev !== false) {
        prev = '/' + version + '/user-flow/' + userType + '/' + prev
      }
      navigation = {
        'prev': prev,
        'next': next
      }
    }
    let theLocation = version + '/' + thisStage.location + '/' + thisPage.location
    if (req.params.subStage) {
      let theStageKey = req.params.stage + '/' + req.params.subStage
      thisStageIndex = common.findIndex(theStageKey, 'location', pageFlow.stages)
      if (thisStageIndex === false) {
        theLocation = version + '/' + thisStage.location + '/' + thisPage['subDir'] + '/' + thisPage.location
      }
    }
    let theUserNeeds
    let arrayOfNeeds = thisPage['userNeeds']
    if (arrayOfNeeds !== undefined) {
      theUserNeeds = common.getUserNeedsForPage(arrayOfNeeds, userNeeds)
    }
    let hasHistory = common.getPageHistory(thisPage, thisStage)
    // @todo - add individual page/stage user needs
    res.render('./includes/page-flow-individual.html',
      {
        isPage: true,
        userType: userType,
        flowType: flowType,
        pageFlow: pageFlow,
        location: theLocation,
        thisPage: thisPage,
        thisStage: thisStage,
        theStageUR: theStageUR,
        userNeeds: theUserNeeds,
        sprint: sprint,
        navigation: navigation,
        hasHistory: hasHistory
      }
    )
  }))
}
