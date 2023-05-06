const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const StudentRouter = require('./routes/student')

// App Settings ---------------------------------------------------------

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Log In ---------------------------------------------------------------

app.get('/login', (req, res) => {
    res.render('Login')
})


// Port and DetaBase ----------------------------------------------------

app.listen(process.env.PORT || 3000)