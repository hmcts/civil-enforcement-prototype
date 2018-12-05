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
    // console.log(csvData)
    // function waitForCSV (theFile) {
    //   // return 'hello'
    //   let stuff = csvtojson().fromFile(theFile).subscribe((jsonObj) => {
    //     return new Promise((resolve, reject) => {
    //       console.log(jsonObj)
    //       return jsonObj
    //     })
    //   })
    //   return stuff
    // }

    //  thisPage = pageFlow['stages']
    let theStageKey = req.params.subStage ? req.params.stage + '/' + req.params.subStage : req.params.stage
    // console.log(theStageKey)
    let thisStage = common.findKey(theStageKey, 'location', pageFlow.stages)
    // if substage - prep the 'key'
    let thisPage = common.findKey(req.params.page, 'location', thisStage.versions[0]['pages'])
    // let theCSVtoJson = await waitForCSV(csvFile)
    // console.log(theCSVtoJson)
    // Get array from csvData using location and stage info
    // let theStageUR = common.findCSVKey(theCSVtoJson, thisStage.name, 'Stage')
    let theStageUR = await common.findCSVKey(csvFile, thisStage.name, 'Stage')
    // key = pages.json 'filename'
    theStageUR = common.findKey(thisPage.id,'Type - Email/ dashboard/ application', theStageUR)
    // can't use csvData async
    console.log(theStageUR)
    // console.log(thisPage)
    res.render(version + '/page-flow-individual.html',
      {
        isPage: true,
        pageFlow: pageFlow,
        location: version + '/' + thisStage.location + '/' + thisPage.location,
        thisPage: thisPage,
        theStageUR: Object.values(theStageUR),
        sprint: sprint,
        csvData: csvData
      }
    )
  }))
}
