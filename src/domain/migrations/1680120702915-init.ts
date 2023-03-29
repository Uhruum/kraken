import { MigrationInterface, QueryRunner } from "typeorm";

export class init1680120702915 implements MigrationInterface {
    name = 'init1680120702915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" varchar, "country" varchar, "countryCode" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), PRIMARY KEY ("latitude", "longitude"))`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationLatitude" integer, "locationLongitude" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationLatitude" integer, "locationLongitude" integer, CONSTRAINT "FK_e4b0467fbac1ef0b4a857725277" FOREIGN KEY ("locationLatitude", "locationLongitude") REFERENCES "location" ("latitude", "longitude") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude" FROM "earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`ALTER TABLE "temporary_earthquake" RENAME TO "earthquake"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "earthquake" RENAME TO "temporary_earthquake"`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationLatitude" integer, "locationLongitude" integer)`);
        await queryRunner.query(`INSERT INTO "earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude" FROM "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
