import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1702876227939 implements MigrationInterface {
    name = 'UpdateUserEntity1702876227939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "userAvatar" character varying NOT NULL DEFAULT 'https://course-platform.s3.eu-north-1.amazonaws.com/userDefaultAvatar/1_W35QUSvGpcLuxPo3SRTH4w.webp'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userAvatar"`);
    }

}
