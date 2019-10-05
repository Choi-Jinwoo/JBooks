export {};

const Router = require("koa-router");

const api = new Router();

const member = require("./member");
const book = require("./book");

api.use("/member", member.routes());
api.use("/book", book.routes());

module.exports = api;
