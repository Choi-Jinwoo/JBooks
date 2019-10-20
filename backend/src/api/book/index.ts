import * as express from 'express';
import bookCtrl from './book.ctrl';
const book = express.Router();

book.get("/", bookCtrl.getLents);
book.get("/:idx", bookCtrl.getLents);
book.post("/", bookCtrl.rent);
book.delete("/:idx", bookCtrl.turnIn);
book.put("/:idx", bookCtrl.extend);

export default book;