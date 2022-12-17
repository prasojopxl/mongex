const express = require("express")
const dotenv = require("dotenv")
const { urlencoded } = require("express")
const cors = require("cors")
const app = express()

dotenv.config()

let whitelist = ["http://localhost:3000"]
let corsoption = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
}

app.use(cors(corsoption))
app.use(express.json())
app.use(
    urlencoded({
        extended: true,
    })
)

const db = require("./models")
db.sequelize
    .sync({ force: true })
    .then(() => {
        console.log("database connected")
    })
    .catch((err) => {
        console.log(`database connection failed.`, err.message)
    })

app.get("/", (req, res) => {
    return res.json({
        message: "server is running",
    })
})

const PORT = process.env.APP_PORT || 9000

app.listen(PORT, () => {
    console.log(`server is running on PORT http://localhost:${PORT}`)
})
