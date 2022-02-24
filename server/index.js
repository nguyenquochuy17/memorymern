const express = require("express")
const cors = require("cors")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const postRoutes = require("./routes/posts")
const userRoutes = require("./routes/user")

dotenv.config()
app.use(express.json({ limit: '50mb', extended: true }))
app.use(cors())

app.use("/post", postRoutes)
app.use("/user", userRoutes)

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
}

main().catch(err => console.log(err))
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is ready in port 5000 ")
})