require('dotenv').config()
require('express-async-errors')

// express
const express = require('express')
const app = express()

// packages
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

const path = require('path')

// database connection
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const planRouter = require('./routes/planRoutes')
const equipmentRouter = require('./routes/equipmentRoutes')
const membershipRouter = require('./routes/membershipRoute')
const reviewRouter = require('./routes/reviewRoutes')

// middleware imports
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./client/build'))
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.get('/', (req, res) => {
    res.send('Thesis! Finish it this sem!')
})

app.get('/api/v1', (req, res) => {
    console.log(req.signedCookies)
    res.send('Cookie response')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/plans', planRouter)
app.use('/api/v1/equipments', equipmentRouter)
app.use('/api/v1/membership', membershipRouter)
app.use('/api/v1/reviews', reviewRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// initiate server
const port = process.env.PORT || 5000
const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        await app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
startServer()
