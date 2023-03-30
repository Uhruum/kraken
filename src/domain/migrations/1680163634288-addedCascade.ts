import { MigrationInterface, QueryRunner } from "typeorm";

export class addedCascade1680163634288 implements MigrationInterface {
    name = 'addedCascade1680163634288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationLatitude" integer, "locationLongitude" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude" FROM "earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`ALTER TABLE "temporary_earthquake" RENAME TO "earthquake"`);
        await queryRunner.query(`CREATE TABLE "temporary_earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationLatitude" integer, "locationLongitude" integer, CONSTRAINT "FK_e4b0467fbac1ef0b4a857725277" FOREIGN KEY ("locationLatitude", "locationLongitude") REFERENCES "location" ("latitude", "longitude") ON DELETE NO ACTION ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude" FROM "earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`ALTER TABLE "temporary_earthquake" RENAME TO "earthquake"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "earthquake" RENAME TO "temporary_earthquake"`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationLatitude" integer, "locationLongitude" integer)`);
        await queryRunner.query(`INSERT INTO "earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude" FROM "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "temporary_earthquake"`);
        await queryRunner.query(`ALTER TABLE "earthquake" RENAME TO "temporary_earthquake"`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationLatitude" integer, "locationLongitude" integer, CONSTRAINT "FK_e4b0467fbac1ef0b4a857725277" FOREIGN KEY ("locationLatitude", "locationLongitude") REFERENCES "location" ("latitude", "longitude") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude" FROM "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "temporary_earthquake"`);
    }

}
