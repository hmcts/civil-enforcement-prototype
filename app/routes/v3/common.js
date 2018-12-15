let fs = require('fs')
let rp = require('request-promise')
const csvtojson = require('csvtojson')
var common = {}

/**
 * Selects relevant 'continueUrl' based upon referrer in header i.e. to use published or local URL
 * @param req
 * @param continueUrl
 * @param continueUrlLocal
 * @returns {*}
 */
common.setContinueUrl = function (req, continueUrl, continueUrlLocal) {
  var returnToLocal = false
  var theContinueUrl = continueUrl
  if (req.headers.referer !== undefined) {
    if (req.headers.referer.search('localhost') !== -1) {
      returnToLocal = true
    } else {
      returnToLocal = false
    }
  } else {
    returnToLocal = false
  }
  if (returnToLocal === true) {
    theContinueUrl = continueUrlLocal
  }
  return encodeURIComponent(theContinueUrl)
}

/**
 * Generates a base URL for the module being used
 * @param dir - the directory being used
 * @param sprint
 * @returns {string}
 */
common.getBaseUrl = function (dir, sprint) {
  var theSprint = common.specifySprint(dir, sprint) || common.getLatestSprint(dir)
  return dir + '/' + theSprint + '/'
}

/**
 * Generates an absolute URL for the prototype
 * @param dir - the directory being used
 * @param referrer - the referrer in the header
 * @returns {string}
 */
common.getAbsoluteUrl = function (dir, referrer) {
  var absoluteUrl = referrer.slice(0, referrer.search(dir))
  return absoluteUrl
}

/**
 * Destroys the current session
 */
common.destroySession = function (req) {
  return req.session.destroy(function (err) {
    if (err) throw err
  })
}

/**
 * Sort array
 */
function compareStrings (a, b) {
  // Assuming you want case-insensitive comparison
  a = a.friendlyName.toLowerCase()
  b = b.friendlyName.toLowerCase()
  return ((a === b) ? 0 : ((a > b) ? 1 : -1))
  // return (a < b) ? -1 : (a > b) ? 1 : 0
}

common.sortArray = function (a, b) {
  return compareStrings(a, b)
}

common.csvtojsonAsync = function (theFile) {
  return csvtojson().fromFile(theFile).subscribe((json) => {
    return new Promise((resolve, reject) => {
      return json
      // Async operation on the json
      // dont forget to call resolve and reject
    })
  })
}

common.csvtojsonSync = function (theFile) {
  return csvtojson().fromFile(theFile).then((jsonObj) => {
    return jsonObj
  })
}

common.csvtojson = async function (theFile) {
  await csvtojson().fromFile(theFile).then((jsonObj) => {
    return jsonObj
  })
}

common.findCSVKey = async function (theFile, key, theParameter) {
  let stages = false
  await csvtojson().fromString(theFile).then((jsonObj) => {
    stages = []
    for (var theKey in jsonObj) {
      if (jsonObj[theKey][theParameter] === key) {
        stages.push(jsonObj[theKey])
      }
    }
    return stages
  })
  return stages
}

common.findKey = function (key, theParameter, theArray) {
  for (var theKey in theArray) {
    if (theArray[theKey][theParameter] === key) return theArray[theKey]
  }
  return false
}

common.findIndex = function (key, theParameter, theArray) {
  for (var theKey in theArray) {
    if (theArray[theKey][theParameter] === key) return theKey
  }
  return false
}

common.getPageBefore = function (pageFlow, index, theArray, thisStageIndex, version) {
  index = parseInt(index)
  thisStageIndex = parseInt(thisStageIndex)
  if (theArray[(index - 1)]) {
    return theArray[(index - 1)].location
  } else if (thisStageIndex > 0) {
    // return common.getLastPageInStage(pageFlow, thisStageIndex - 1)
    // get the previous stage's location
    let thePreviousStage = pageFlow['stages'][(thisStageIndex - 1)]
    // get the last page in the selected stage
    let theLastPageOfPreviousStage = null
    if (thePreviousStage.versions[0]['pages']) {
      theLastPageOfPreviousStage = thePreviousStage.versions[0]['pages'].slice(-1)[0]
    }
    return '/' + version + '/page-flow/' + thePreviousStage.location + '/' + theLastPageOfPreviousStage.location
  } else {
    return false
  }
}

common.getPageAfter = function (pageFlow, index, theArray, thisStageIndex, version) {
  index = parseInt(index)
  thisStageIndex = parseInt(thisStageIndex)
  if (theArray[(index + 1)]) {
    return theArray[(index + 1)].location
  } else if (pageFlow['stages'][(thisStageIndex + 1)]) {
    let theNextStage = pageFlow['stages'][(thisStageIndex + 1)]
    return '/' + version + '/page-flow/' + theNextStage.location + '/' + theNextStage['versions'][0]['pages'][0].location
  } else {
    return false
  }
}

common.getPageHistory = function (thisPage, thisStage) {
  let versions = []
  for (let theVersion in thisStage.versions) {
    for (let thePage in thisStage.versions[theVersion]['pages']) {
      if (thisStage.versions[theVersion]['pages'][thePage]['location'] === thisPage.location) {
        versions.push({
          'version': thisStage.versions[theVersion]['version'],
          'sprint': thisStage.versions[theVersion]['sprint'],
          'location': '/' + thisStage.versions[theVersion]['sprintDirectory'] + thisStage.versions[theVersion]['location'] + thisStage.versions[theVersion]['pages'][thePage]['location']
        })
      }
    }
  }
  return versions
}

common.getCSVFile = async function (theFile) {
  const theData = await fs.readFileSync(theFile, 'utf8', function (err, data) {
    if (err) throw err
    return data
  })
  return theData
}

common.getUrData = async function (theSheetsURL, theBackupCSVFile) {
  const theData = await rp(theSheetsURL)
    .then((html) => html) // Process html...
    .catch(function (err) {
      // console.error(err)
      return common.getCSVFile(theBackupCSVFile)
    })
  return theData
}

common.pageFlowFromUserFlow = function (theUserFlow, thePageFlow) {
  let userJourneys = [] // main array
  for (let theJourney in theUserFlow['journeys']) {
    let stagesInJourney = []
    let stageInJourney = {}
    let pagesInStage = []
    let previousStage
    for (let thePage in theUserFlow['journeys'][theJourney]['flow']) {
      // @todo - build structure similar to pageFlow
      let theStage = theUserFlow['journeys'][theJourney]['flow'][thePage]['stage']
      if (theStage === previousStage) {
        let page = {'id': theUserFlow['journeys'][theJourney]['flow'][thePage]['pageId']}
        pagesInStage.push(page)
        stageInJourney = {'stage': theStage, 'pages': pagesInStage}
      } else {
        if (previousStage !== undefined) {
          stagesInJourney.push(stageInJourney)
        }
        pagesInStage = []
        let page = {'id': theUserFlow['journeys'][theJourney]['flow'][thePage]['pageId']}
        pagesInStage.push(page)
        stageInJourney = {'stage': theStage, 'pages': pagesInStage}
      }
      previousStage = theStage
    }
    stagesInJourney.push(stageInJourney)
    userJourneys.push({
      'userType': theUserFlow['journeys'][theJourney]['name'],
      'flow': stagesInJourney
    })
  }
  console.log(userJourneys)
  return userJourneys
}

module.exports = common
