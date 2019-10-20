import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Lent } from '../../entity/Lent';
import { Member } from '../../entity/Member';
import colorConsole from '../../lib/console';
import validate from '../../lib/validate';
// import formatDate from '../../lib/formatDate';

class BookCtrl {
	public rent = async (req: Request, res: Response) => {
		colorConsole.green("[BOOK] 도서 대여");
		const { body } = req;
		// body.retrunDate = formatDate(body.retrunDate);
		try {
			await validate.validateRent(body);
		} catch (error) {
			colorConsole.yellow(error.message);
			return res.status(400).json({ status: 400, message: '검증 오류입니다.' });
		}

		try {
			if (!(await getRepository(Member).findOne(body.id))) {
				colorConsole.yellow("회원이 존재하지 않습니다.");
				return res.status(204).json({ status: 204, message: '회원이 존재하지 않습니다.' });
			}
			let lent = new Lent();
			lent = body;
			getRepository(Lent).save(lent);
			return res.status(200).json({ status: 200, message: '도서 대여에 성공하였습니다.' });
		} catch (error) {
			colorConsole.red(error.message);
			return res.status(500).json({ status: 500, message: '도서 대여에 실패하였습니다.' });
		}
	}

	public turnIn = async (req: Request, res: Response) => {
		colorConsole.green('[BOOK] 도서 반납');
		try {
			const { idx } = req.params;
			if (!idx) {
				colorConsole.yellow('idx가 전송되지 않았습니다.');
				return res.status(400).json({ status: 400, message: '검증 오류입니다.' });
			}
			if (!(await getRepository(Lent).findOne(idx))) {
				colorConsole.yellow('대여 정보가 존재하지 않습니다.');
				return res.status(204).json({ status: 204, message: '대여 정보가 존재하지 않습니다.' });
			}
			await getRepository(Lent).delete(idx);
			return res.status(200).json({ status: 200, message: '도서 반납에 성공하였습니다.' });
		} catch (error) {
			colorConsole.red(error.message);
			return res.status(500).json({ status: 500, message: '도서 반납에 실패하였습니다.' });
		}
	}

	public extend = async (req: Request, res: Response) => {
		colorConsole.green('[BOOK] 대여 연장');
		const { idx } = req.params;
		const { body } = req.body;

		try {
			await validate.validateExtend(body);
		} catch (error) {
			colorConsole.yellow(error.message);
			return res.status(400).json({ status: 400, message: '검증 오류입니다. ' });
		}

		try {
			if (!(await getRepository(Lent).findOne(idx))) {
				colorConsole.yellow('대여 정보가 존재하지 않습니다.');
				return res.status(204).json({ status: 204, message: '대여 정보가 존재하지 않습니다.' });
			}
			await getRepository(Lent).update(idx, body);
			return res.status(200).json({ status: 200, message: '대여 연장에 성공하였습니다.' });
		} catch (error) {
			colorConsole.red(error.message);
			return res.status(500).json({ status: 500, message: '대여 연장에 실패하였습니다.' });
		}
	}

	public getLents = async (req: Request, res: Response) => {
		colorConsole.green('[BOOK] 대여 전체 조회');
		try {
			const lents = await getRepository(Lent).find();
			if (!lents.length) {
				colorConsole.yellow('대여 정보가 존재하지 않습니다.');
				return res.status(204).json({ status: 204, message: '대여 정보가 존재하지 않습니다.' });
			}
			for (let i = 0; i < lents.length; i++) {
				lents[i].member = await getRepository(Member).findOne(lents[i].id);
				delete lents[i].id;
			}
			return res.status(200).json({ status: 200, message: '대여 전체 조회에 성공하였습니다.', data: { lents } });
		} catch (error) {
			colorConsole.red(error.message);
			return res.status(500).json({ status: 500, message: '대여 전체 조회에 실패하였습니다.' });
		}
	}
}

export default new BookCtrl;