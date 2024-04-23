if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './src/.env' });
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
var port = 3000

const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('puclic'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))



const mongoose = require('mongoose') 
mongoose.connect(process.env.DATABASE_URL, { 
  useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorsRouter)

app.listen(process.env.PORT || port, (req, res) => {
  console.log(`Port listening on ${port}`)
})