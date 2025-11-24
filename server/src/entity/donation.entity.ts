import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('donations')
export class DonationEntity {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  sender_public_key: string;

  @Column({ type: 'bigint', unsigned: true })
  amount_cspr: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'varchar' })
  transaction_hash: string;
}
