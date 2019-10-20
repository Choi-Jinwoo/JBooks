import * as express from 'express';
import book from './book';
import member from './member';

const router = express.Router();

router.use('/book', book);
router.use('/member', member);

export default router;