import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMessageEntity1702873507642 implements MigrationInterface {
  name = 'CreateMessageEntity1702873507642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "groups" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "usersToGroups" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_e1dbbc8d2667f05f03d3bd8a621" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "lastLoginAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "messages" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying NOT NULL, "userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "groups" ADD CONSTRAINT "FK_898cf6af34722df13f760cc364f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "usersToGroups" ADD CONSTRAINT "FK_de85b61a001c764872f1b179f8d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "usersToGroups" ADD CONSTRAINT "FK_b809e3aaa27e3d621997deee95b" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "messages" ADD CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "messages" DROP CONSTRAINT "FK_438f09ab5b4bbcd27683eac2a5e"',
    );
    await queryRunner.query(
      'ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"',
    );
    await queryRunner.query(
      'ALTER TABLE "usersToGroups" DROP CONSTRAINT "FK_b809e3aaa27e3d621997deee95b"',
    );
    await queryRunner.query(
      'ALTER TABLE "usersToGroups" DROP CONSTRAINT "FK_de85b61a001c764872f1b179f8d"',
    );
    await queryRunner.query(
      'ALTER TABLE "groups" DROP CONSTRAINT "FK_898cf6af34722df13f760cc364f"',
    );
    await queryRunner.query('DROP TABLE "messages"');
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TABLE "usersToGroups"');
    await queryRunner.query('DROP TABLE "groups"');
  }
}
