export {};

class MemberCtrl {
  createMember;
  getMembers;
  getMember;
  modifyMember;
  deleteMember;
}

const Router = require("koa-router");

const member = new Router();
const memberCtrl: MemberCtrl = require("./member.ctrl");

member.post("/", memberCtrl.createMember);
member.get("/", memberCtrl.getMembers);
member.get("/:id", memberCtrl.getMember);
member.put("/:id", memberCtrl.modifyMember);
member.delete("/:id", memberCtrl.deleteMember);

module.exports = member;
