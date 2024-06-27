const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.redirect(`/mycourses`)
})

router.get('/mycourses', (req, res) => {
    
    res.render('mycourses', {layout: 'layouts/studentLayout', name: req.user.name})
})

router.get('/grades', (req, res) => {
    res.render('grades', {layout: 'layouts/studentLayout', name: req.user.name, id: req.user.id})
})

module.exports = router