if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

//Requires:
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose');

const IndexRouter = require('./routes/index')
const StudentRouter = require('./routes/student')

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

// App Settings:
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

//DataBase:
const mongoURI = process.env.DATABASE_URL;
if (!mongoURI) {
    console.error('MongoDB URI is not defined. Please set the MONGO_URI environment variable.');
    process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Routers:
app.use('/', IndexRouter)
app.use('/students', StudentRouter)

// Log In:
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
    successRedirect: '/students/mycourses',
    failureRedirect: '/login',
    failureFlash: true
}))

// Chack Atintication:

// Port and DetaBase:
app.listen(process.env.PORT || 3000)