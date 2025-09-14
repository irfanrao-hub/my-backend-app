import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // table name = users
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', type: 'varchar', length: 100 })
  fullName: string;

  @Column({ unique: true, type: 'varchar', length: 150 })
  email: string;

  @Column({ name: 'personal_whatsapp_number', type: 'varchar', length: 20 })
  personalWhatsappNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string | null;
}
