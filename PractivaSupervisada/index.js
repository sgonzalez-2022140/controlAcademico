import { initServer } from "./configs/app.js"
import { connect } from "./configs/mongo.js"
import { userDefect } from '../PractivaSupervisada/src/user/user.controller.js'

userDefect()
initServer()
connect()