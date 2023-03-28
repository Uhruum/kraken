import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedEntities1680027088951 implements MigrationInterface {
    name = 'updatedEntities1680027088951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_location" ("id" varchar PRIMARY KEY NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" varchar, "country" varchar, "countryCode" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_location"("id", "latitude", "longitude", "city", "country", "countryCode") SELECT "id", "latitude", "longitude", "city", "country", "countryCode" FROM "location"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`ALTER TABLE "temporary_location" RENAME TO "location"`);
        await queryRunner.query(`CREATE TABLE "temporary_earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "time" datetime NOT NULL, "locationId" varchar, "magnitude" integer NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_db77e238ad369c147f95ef73769" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_earthquake"("id", "title", "time", "locationId") SELECT "id", "title", "time", "locationId" FROM "earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`ALTER TABLE "temporary_earthquake" RENAME TO "earthquake"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "earthquake" RENAME TO "temporary_earthquake"`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "time" datetime NOT NULL, "locationId" varchar, CONSTRAINT "FK_db77e238ad369c147f95ef73769" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "earthquake"("id", "title", "time", "locationId") SELECT "id", "title", "time", "locationId" FROM "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "temporary_earthquake"`);
        await queryRunner.query(`ALTER TABLE "location" RENAME TO "temporary_location"`);
        await queryRunner.query(`CREATE TABLE "location" ("id" varchar PRIMARY KEY NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" varchar, "country" varchar, "countryCode" varchar)`);
        await queryRunner.query(`INSERT INTO "location"("id", "latitude", "longitude", "city", "country", "countryCode") SELECT "id", "latitude", "longitude", "city", "country", "countryCode" FROM "temporary_location"`);
        await queryRunner.query(`DROP TABLE "temporary_location"`);
    }

}
