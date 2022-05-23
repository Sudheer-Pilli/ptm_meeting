const path = require('path')
const mysql = require('mysql2')
const express = require('express')
const formidable = require('express-formidable')
const app = express()
const port = 9000

app.listen(port, () => console.log(`Server listening on port ${port}!`))
app.use(express.static(path.join(__dirname, '../')))
app.use(formidable())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sudheer@16',
    database: 'ptm'
})
connection.connect((err) => {
    if (!err) console.log('Database Connected')
    else console.log('Error Connecting to database \n' + err)
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    res.end()
})

app.get('/meeting', (req, res) => {
    connection.query('select * from meeting', (err, data) => {
        if (!err) {
            res.json(data)
        } else {
            console.log(err);
        }
    })
})

app.post('/addMeeting', (req, res) => {
    var obj = Object.values(req.fields.data)
    connection.query('insert into meeting (meeting_id, meeting_name, meeting_time, set_by, meeting_link) values ?', [
        [obj]
    ], (err) => {
        if (!err) console.log("Added")
        else console.log(err)
    })
    return res.json("Added Successfully")
})

app.post('/updateMeeting', (req, res) => {

    var obj = Object.values(req.fields.data)
    var sqlUpdate = `update meeting set meeting_id = "${obj[0]}" , meeting_name = "${obj[1]}" , meeting_time = "${obj[2]}" , set_by ="${obj[3]}", meeting_link = "${obj[4]}" where meeting_id = "${obj[0]}" `
    connection.query(sqlUpdate, [obj, obj[0]], (err) => {
        if (!err) console.log(`updated successfully to meeting `)
        else console.log(err)
    })
    res.setHeader('Location', '/')
    return res.end()
})

app.post('/delStudent', (req, res) => {
    var obj = Object.values(req.fields)
    connection.query('delete from meeting where meeting_id=?', obj, (err) => {
        if (!err) console.log(`deleted successfully from meeting `)
        else console.log(err)
    })
    res.setHeader('Location', '/')
    return res.end()
})

// app.get('/maleAG', (req, res) => {
//     connection.query('select * from meeting where (gender="male" and grade="A")', (err, data) => {
//         if (!err) {
//             res.writeHead(200, { 'Content-Type': 'text/JSON' })
//             res.write(data)
//             res.end()
//         } else {
//             console.log(err);
//         }
//     })
// })