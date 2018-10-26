const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
require('./routes/step-by-step.js')(router)

module.exports = router
