import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Member } from './Member';
@Entity()
export class Lent extends BaseEntity {
	@PrimaryGeneratedColumn()
	idx: number;

	@Column({
		length: 45
	})
	id: string

	@Column({
		length: 45
	})
	name: string

	@Column({
		default: () => 'CURRENT_TIMESTAMP'
	})
	lentDate: Date

	@Column()
	returnDate: Date

	member: Member;
}