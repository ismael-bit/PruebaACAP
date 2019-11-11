import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'

const app = express()
const port = 3000

// middleware
app.use(bodyParser.json())
app.use('/api', routes)

app.get('/', (req, res) => {
 res.send('Hola Mundo....!')
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))