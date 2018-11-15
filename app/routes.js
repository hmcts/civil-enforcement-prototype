const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
require('./routes/v1/step-by-step.js')(router)
require('./routes/v1/notifications.js')(router)
require('./routes/v1/enforcement-selection.js')(router)
require('./routes/v1/writs.js')(router)
require('./routes/v1/dashboard.js')(router)
require('./routes/v1/govuk-pay.js')(router)

module.exports = router
