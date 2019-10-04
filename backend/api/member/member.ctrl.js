const colorConsole = require('../../lib/console');
const models = require('../../models');
const Validate = require('../../lib/validation');

exports.createMember = async (ctx) => {
	colorConsole.green('[MEMBER] 회원 추가');
	const { body } = ctx.request;
	
	try {
		await Validate.validateCreateMember(body);
	} catch(error) {
		colorConsole.yellow(error.message);

		ctx.status = 400;
		ctx.body = {
			status: 400,
			message: '검증 오류입니다.',
		};
		return;
	}
	
	try {
		if (await models.Member.getMember(body.id)) {
			colorConsole.yellow('이미 회원이 존재합니다.');
			ctx.status = 409;
			ctx.body = {
				status: 409,
				message: '이미 회원이 존재합니다.',
			};

			return;
		}
		await models.Member.createMember(body);

		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '회원 생성에 성공하였습니다.',
		};
	} catch(error) {
		colorConsole.red(error.message);

		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '회원 생성에 실패하였습니다.'
		};
	}
}

exports.getMembers = async (ctx) => {
	colorConsole.green('[MEMBER] 회원 전체 조회');
	try {
		const members = await models.Member.getMembers();
		if (!members.length) {
			colorConsole.yellow('회원이 존재하지 않습니다.');
			ctx.status = 204;
			ctx.body = {
				status: 204,
				message: '회원이 존재하지 않습니다.',
			};
			return;
		}
		for (let i = 0; i < members.length; i++) {
			members[i].lent = await models.Lent.getLentByMember(members[i].id);
		}
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '회원 전체 조회에 성공하였습니다.',
			data: {
				members,
			},
		};
	} catch(error) {
		colorConsole.red(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '회원 전체 조회에 실패하였습니다.',
		};
	}
}

exports.getMember = async (ctx) => {
	colorConsole.green('[MEMBER] 회원 조회');
	try {
		const { id } = ctx.params;
		const member = await models.Member.getMember(id);
		if (!member) {
			colorConsole.yellow('회원이 존재하지 않습니다.');
			ctx.status = 204;
			ctx.body = {
				status: 204,
				message: '회원이 존재하지 않습니다.',
			};
			return;
		}
		member.lent = await models.Lent.getLentByMember(id);
		ctx.status = 200
		ctx.body = {
			status: 200,
			message: '회원 조회에 성공하였습니다.',
			data: {
				member,
			},
		};
	} catch(error) {
		colorConsole.red(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			member: '회원 조회에 실패하였습니다.',
		};
	}
}

exports.modifyMember = async (ctx) => {
	colorConsole.green('[MEMBER] 회원 수정');
	const { id } = ctx.params;
	const { body } = ctx.request;
	try {
		Validate.validateModifyMember(body);
	} catch(error) {
		colorConsole.log(error.message);
		ctx.status = 400;
		ctx.body = {
			status: 400,
			message: '검증 오류입니다.',
		};
		return;
	}

	try {
		if (!await models.Member.getMember(id)) {
			colorConsole.yellow('회원이 존재하지 않습니다.');
			ctx.status = 204;
			ctx.body = {
				status: 204,
				message: '회원이 존재하지 않습니다.',
			};
			return;
		}
		await models.Member.updateMember(id, body);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '회원 수정에 성공하였습니다.',
		};
	} catch(error) {
		colorConsole.red(error.message);
		ctx.body = {
			status: 500,
			message: '회원 수정에 실패하였습니다.',
		};
	}
}

exports.deleteMember = async (ctx) => {
	colorConsole.green('[MEMBER] 회원 삭제');
	
	try {
		const { id } = ctx.params;
		if (!await models.Member.getMember(id)) {
			colorConsole.yellow('회원이 존재하지 않습니다.');
			ctx.status = 204;
			ctx.body = {
				status: 204,
				message: '회원이 존재하지 않습니다.',
			};
			return;
		}
		await models.Member.deleteMember(id);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '회원 삭제에 성공하였습니다.',
		};
	} catch(error) {
		colorConsole.red(error.message);
		ctx.body = {
			status: 500,
			message: '회원 삭제에 실패하였습니다.',
		};
	}
}