const express = require('express');
const router = express.Router()
const {getPage,newPage} = require('../../Controllers/Page/getRecord')


router.get('/',getPage) 
router.post('/',newPage)


module.exports = router