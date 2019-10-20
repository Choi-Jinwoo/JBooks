import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { Lent } from './Lent';

@Entity()
export class Member extends BaseEntity {
	@PrimaryColumn({
		length: 45
	})
	id: string;

	@Column({
		length: 45
	})
	name: string;

	@Column()
	birthYear: number;

	@Column({
		default: () => 'CURRENT_TIMESTAMP'
	})
	date: Date;

	lent: Lent | Lent[];
}