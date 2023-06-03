const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const StudentRouter = require('./routes/student')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

// App Settings ---------------------------------------------------------

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.set('view options', { layout: false });
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Log In ---------------------------------------------------------------

app.get('/adduser', (req, res) => {
    res.render('adduser')
})

app.post('/adduser', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: "omer",
            email: req.body.email,
            password: hashedPassword
        })
        console.log(users);
        res.redirect('/login')
    } catch (err){
        console.log(err);
        res.redirect('/adduser')
    }
})

app.get('/login', (req, res) => {
    res.render('Login')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/mycourses',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/mycourses', (req, res) => {
    res.render('mycourses', {layout: 'layouts/studentLayout'})
})


// Port and DetaBase ----------------------------------------------------

app.listen(process.env.PORT || 3000)