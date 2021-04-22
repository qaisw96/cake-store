// import packages 
require('dotenv').config()

const express = require('express')
const pg = require('pg')
const methodOverride = require('method-override')
const superagent = require('superagent')

// variables from .env file
 const {PORT, DATABASE_URL} = process.env

// application setup 
const app = express()
const client = new pg.Client(DATABASE_URL)

// middleware 
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('./public'));
app.set('view engine', 'ejs')


// endPoints
app.get('/', renderHomePage)
// app.post('/save', saveOrder)


// callback function
function renderHomePage(req, res) {
    const sql = 'SELECT * FROM items;'

    client.query(sql).then(results => {
        // console.log(results.rows);
        res.render('pages/index', {items: results.rows})
    })
}




// helper function 




// listening 
client.connect().then(() => {
    console.log('connect to DB ...');
    app.listen(PORT, () => console.log(`connect to port ${PORT} ...`));
})

app.use('*', (req, res) => res.send('That is not route')  )

