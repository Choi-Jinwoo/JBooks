require("dotenv").config();
require("./models");

const Koa = require("koa");
const cors = require("koa-cors");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const colors = require("colors");
const api = require("./api");

let PORT = process.env.PORT;
if (!PORT) {
  PORT = "3000";
}

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

router.use(api.routes());
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`Server is listening to port ${colors.cyan(PORT)}`);
});
