import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGroupEntity1704375985466 implements MigrationInterface {
    name = 'UpdateGroupEntity1704375985466'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "groupAvatar" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "groupAvatar"`);
    }

}
