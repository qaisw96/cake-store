// import packages 
require('dotenv').config()

const express = require('express')
const pg = require('pg')
const methodOverride = require('method-override')
const superagent = require('superagent')
const { json } = require('express')

// variables from .env file
 const {PORT, DATABASE_URL, PASS, USER} = process.env

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
app.post('/save', saveOrder)
app.get('/dashboard', renderDashboardPage)
app.post('/dashboard/open', checkPassAndUser)
app.delete('/order/delete', deleteOrderFromDB)
app.put('/item/update', updateItems)


// app.get('/dashboard/open', getDataToDashboard)

// callback function
function renderHomePage(req, res) {
    const sql = 'SELECT * FROM items;'
    
    client.query(sql).then(results => {
        // console.log(results.rows);
        res.render('pages/index', {items: results.rows})
    })
}

function saveOrder(req, res) {
    const {name, location, phone_number, juice, quantity} = req.body
    console.log(quantity);

    const sql = 'INSERT INTO orders (person_name, phone_number, delivery_place, item_order, quantity) VALUES ($1, $2, $3, $4, $5) ;'
    const val = [name, phone_number, location, juice, quantity]

    client.query(sql, val).then(() =>{
        res.send({"status": "failed"})
    })

}

function renderDashboardPage(req, res) {
    res.render('pages/dashboard', {PASS: PASS, USER: USER})
}

function checkPassAndUser(req, res) {
    const {user_name, password} = req.body
    const sqlOrders = 'SELECT * FROM orders;'
    const sqlItems = 'SELECT * FROM items;'
    client.query(sqlOrders).then(results => {
        client.query(sqlItems).then(items =>{

            if((password === PASS) && (user_name === USER)) {
                res.render('pages/dash-open', {orders: results.rows, items: items.rows})
            }else {
                res.redirect('/')
    
            }
        })
    })
 
    
}

function deleteOrderFromDB(req, res) {
    const id = req.body.id
    
    const sql = 'DELETE FROM orders WHERE id=$1;'
    const val = [id]

    client.query(sql, val).then(() => {

        res.send({"status": "failed"})
    })

}

function updateItems(req, res) {
    const {id, image, name, price} = req.body
    const sql = 'UPDATE items SET image=$1, name=$2, price=$3 WHERE id=$4;'
    const val = [ image, name, price , id]
    client.query(sql, val).then(() => {

        res.send({"status": "failed"})
    })
    
}

// helper function 




// listening 
client.connect().then(() => {
    console.log('connect to DB ...');
    app.listen(PORT, () => console.log(`connect to port ${PORT} ...`));
})

app.use('*', (req, res) => res.send('That is not route')  )

