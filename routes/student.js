const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.redirect(`${req.user.id}/mycourses`)
})

router.get('/:id/mycourses', (req, res) => {
    
    res.render('mycourses', {layout: 'layouts/studentLayout', name: req.user.name, id: req.user.id})
})

router.get('/:id/grades', (req, res) => {
    res.render('grades', {layout: 'layouts/studentLayout', name: req.user.name, id: req.user.id})
})

module.exports = router