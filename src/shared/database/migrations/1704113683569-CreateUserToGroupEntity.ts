import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserToGroupEntity1704113683569 implements MigrationInterface {
    name = 'CreateUserToGroupEntity1704113683569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e"`);
        await queryRunner.query(`CREATE TABLE "usersToGroups" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_e1dbbc8d2667f05f03d3bd8a621" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "usersToGroups" ADD CONSTRAINT "FK_de85b61a001c764872f1b179f8d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usersToGroups" ADD CONSTRAINT "FK_b809e3aaa27e3d621997deee95b" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e"`);
        await queryRunner.query(`ALTER TABLE "usersToGroups" DROP CONSTRAINT "FK_b809e3aaa27e3d621997deee95b"`);
        await queryRunner.query(`ALTER TABLE "usersToGroups" DROP CONSTRAINT "FK_de85b61a001c764872f1b179f8d"`);
        await queryRunner.query(`DROP TABLE "usersToGroups"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
