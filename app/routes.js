const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
require('./routes/step-by-step.js')(router)
require('./routes/enforcement-selection.js')(router)
require('./routes/writs.js')(router)
require('./routes/govuk-pay.js')(router)

module.exports = router
