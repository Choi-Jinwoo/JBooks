const Router = require('koa-router');

const book = new Router();
const bookCtrl = require('./book.ctrl');

book.get('/search', bookCtrl.searchLents);
book.get('/', bookCtrl.getLents);
book.get('/:idx', bookCtrl.getLents);
book.post('/', bookCtrl.rent);
book.delete('/:idx', bookCtrl.turnIn);
book.put('/:idx', bookCtrl.extend);

module.exports = book;