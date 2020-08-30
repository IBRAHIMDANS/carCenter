import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity, EventSubscriber } from 'typeorm/index';
import { IsString } from 'class-validator';

@Entity({
  name: 'Car',
})
@EventSubscriber()
export class Car extends  BaseEntity{

  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255, name: 'name', nullable: false })
  @IsString()
  name: string;

  @Column({ length: 255, name: 'color', nullable: true })
  @IsString()
  color: string;

  @Column({ length: 255, name: 'state', nullable: true })
  @IsString()
  state: string;

  @Column({ type: 'simple-array', name: 'activity_domain', nullable: true })
  @IsString()
  activityDomain: string[];

  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  createDates() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }
}
