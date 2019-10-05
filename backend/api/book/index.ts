export {};

class BookCtrl {
  searchLents;
  getLents;
  rent;
  turnIn;
  extend;
}

const Router = require("koa-router");
const book = new Router();
const bookCtrl: BookCtrl = require("./book.ctrl");

book.get("/search", bookCtrl.searchLents);
book.get("/", bookCtrl.getLents);
book.get("/:idx", bookCtrl.getLents);
book.post("/", bookCtrl.rent);
book.delete("/:idx", bookCtrl.turnIn);
book.put("/:idx", bookCtrl.extend);

module.exports = book;
