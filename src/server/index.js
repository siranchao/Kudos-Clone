const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
mongoose
  .connect(
    "mongodb+srv://rpdumongoadmin:xSefQqB8IyW27TI4@rpdumongocluster.6nf0ury.mongodb.net/rpdu_kudos",
    {}
  )
  .then(() => {
    console.log("database is connected")
  })
  .catch(err => {
    console.log(err)
  })
app.use(bodyParser.json())
const userRoute = require("./routes/usersRoute")
const kudosRoute = require("./routes/kudosRoute")

app.use("/api/users", userRoute)
app.use("/api/kudos", kudosRoute)

const port = process.env.PORT || 1337

app.listen(port, () => console.log(`listening on port ${port}`))
