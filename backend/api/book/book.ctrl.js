const colorConsole = require('../../lib/console');
const models = require('../../models');
const Validate = require('../../lib/validation');

exports.rent = async (ctx) => {
	colorConsole.green('[BOOK] 도서 대여');
	const { body } = ctx.request;

	try {
		Validate.validateRent(body);
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
		if (!await models.Member.getMember(body.id)) {
			colorConsole.yellow('회원이 존재하지 않습니다.');
			ctx.status = 204;
			ctx.body = {
				status: 204,
				message: '회원이 존재하지 않습니다.',
			};
			return;
		}
		await models.Lent.createLent(body);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '도서 대여에 성공하였습니다.',
		};
	} catch(error) {
		colorConsole.red(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '도서 대여에 실패하였습니다.',
		};
	}
}

exports.turnIn = async (ctx) => {
	colorConsole.green('[BOOK] 도서 반납');
	try {
		const { idx } = ctx.request;
		if (!await models.Lent.getLent(idx)) {
			colorConsole.yellow('대여 정보가 존재하지 않습니다.');
			ctx.status = 204;
			ctx.body = {
				status: 204,
				message: '대여 정보가 존재하지 않습니다.',
			};
			return;
		}
		await models.Lent.deleteLent(idx);
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '도서 반납에 성공하였습니다.',
		};
	} catch(error) {
		colorConsole.red(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '도서 반납에 실패하였습니다.',
		};
	}
}

exports.extend = async (ctx) => {
	colorConsole.green('[BOOK] 대여 연장');
	const { idx } = ctx.params;
	const { body } = ctx.request;

	try {
		await Validate.validateExtend(body);
	} catch(error) {
		colorConsole.yellow(error.message);
		ctx.status = 400,
		ctx.body = {
			status: 400,
			message: '검증 오류입니다.',
		};
		return;
	}

	try {
		if (!await models.Lent.getLent(idx)) {
			colorConsole.yellow('대여 정보가 존재하지 않습니다.');
			ctx.status = 204;
			ctx.body = {
				status: 204,
				message: '대여 정보가 존재하지 않습니다.',
			};
			return;
		}
		await models.Lent.updateLent(idx, body);
		ctx.status = 200,
		ctx.body = {
			status: 200,
			message: '대여 연장에 성공하였습니다.',
		};
	} catch(error) {
		colorConsole.red(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '대여 연장에 실패하였습니다.',
		};
	}
}

exports.getLents = async (ctx) => {
	colorConsole.green('[BOOK] 대여 전체 조회');
	try {
		const lents = await models.Lent.getLents();
		if (!lents.length) {
			colorConsole.yellow('대여 정보가 존재하지 않습니다.');
			ctx.status = 204;
			ctx.body = {
				status: 204,
				message: '대여 정보가 존재하지 않습니다.',
			};
			return;
		}
		for (let i = 0; i < lents.length; i++) {
			lents[i].member = await models.Member.getMember(lents[i].id);
			delete lents[i].id;
		}
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '대여 전체 조회에 성공하였습니다.',
			data: {
				lents,
			},
		};
	} catch(error) {
		colorConsole.red(error.red);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '대여 전체 조회에 실패하였습니다.',
		};
	}
}

exports.searchLents = async (ctx) => {
	colorConsole.green('[BOOK] 대여 검색');
	const { name } = ctx.request.query;
	if (!name) {
		colorConsole.yellow('책 이름이 전송되지 않았습니다.');
		ctx.status = 400;
		ctx.body = {
			status: 400,
			message: '검증 오류입니다.',
		};
		return;
	}
	try {
		const lents = await models.Lent.searchLents(name);
		if (!lents.length) {
			colorConsole.yellow('대여 정보가 존재하지 않습니다.');
			ctx.status = 204;
			ctx.body = {
				status: 204,
				message: '대여 정보가 존재하지 않습니다.',
			};
			return;
		}
		ctx.status = 200;
		ctx.body = {
			status: 200,
			message: '대여 검색에 성공하였습니다.',
			data: {
				lents,
			},
		};
	} catch(error) {
		colorConsole.red(error.message);
		ctx.status = 500;
		ctx.body = {
			status: 500,
			message: '대여 검색에 실패하였습니다.',
		};
	}
}