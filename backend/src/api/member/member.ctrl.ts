import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Member } from '../../entity/Member';
import colorConsole from '../../lib/console';
import validate from '../../lib/validate';
import { Lent } from '../../entity/Lent';

class MemberCtrl {
	public createMember = async (req: Request, res: Response) => {
		colorConsole.green("[MEMBER] 회원 추가");
		const { body } = req;
		const returnDate = new Date();
		returnDate.setDate(returnDate.getDate() + body.returnDate);

		try {
			await validate.validateCreateMember(body);
		} catch (error) {
			colorConsole.yellow(error.message);
			return res.status(400).json({ status: 400, message: '검증 오류입니다.' });
		}
		try {
			if (await getRepository(Member).findOne(body.id)) {
				colorConsole.yellow("이미 회원이 존재합니다.");
				return res.status(409).json({ status: 409, message: '이미 회원이 존재합니다.' });
			}
			let member = new Member;
			member = body;
			getRepository(Member).save(member);
			return res.status(200).json({ status: 200, message: '회원 생성에 성공하였습니다.' });
		} catch (error) {
			colorConsole.red(error.message);
			return res.status(500).json({ status: 500, message: '회원 생성에 실패하였습니다.' });
		}
	}

	public getMembers = async (req: Request, res: Response) => {
		colorConsole.green("[MEMBER] 회원 전체 조회");
		try {
			const members = await getRepository(Member).find();
			if (!members.length) {
				colorConsole.yellow("회원이 존재하지 않습니다.");
				return res.status(204).json({ status: 204, message: '회원이 존재하지 않습니다.' });
			}
			for (let i = 0; i < members.length; i++) {
				members[i].lent = await getRepository(Lent).find({ where: { id: members[i].id } });
			}
			return res.status(200).json({ status: 200, message: '회원 전체 조회에 성공하였습니다.', data: { members } });
		} catch (error) {
			colorConsole.red(error.message);
			return res.status(500).json({ status: 500, message: '회원 전체 조회에 실패하였습니다.' });
		}
	}

	public getMember = async (req: Request, res: Response) => {
		colorConsole.green("[MEMBER] 회원 조회");
		try {
			const { id } = req.params;
			const member = await getRepository(Member).findOne(id);
			if (!member) {
				colorConsole.yellow("회원이 존재하지 않습니다.");
				return res.status(204).json({ status: 204, message: '회원이 존재하지 않습니다.' });
			}

			member.lent = await getRepository(Lent).find({ where: { id } });
			return res.status(200).json({ status: 200, message: '회원 조회에 성공하였습니다.', data: { member } });
		} catch (error) {
			colorConsole.red(error.message);
			return res.status(500).json({ status: 500, message: '회원 조회에 실패하였습니다.' });
		}
	}
}

export default new MemberCtrl;