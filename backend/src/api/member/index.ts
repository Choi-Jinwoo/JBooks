import * as express from 'express';
import memberCtrl from './member.ctrl';
const member = express.Router();

member.post('/', memberCtrl.createMember);
member.get('/', memberCtrl.getMembers);
member.get('/:id', memberCtrl.getMember);

export default member;