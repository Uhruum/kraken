import { MigrationInterface, QueryRunner } from "typeorm";

export class locationPrimaryKeyChange1680163968331 implements MigrationInterface {
    name = 'locationPrimaryKeyChange1680163968331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationLatitude" integer, "locationLongitude" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude" FROM "earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`ALTER TABLE "temporary_earthquake" RENAME TO "earthquake"`);
        await queryRunner.query(`CREATE TABLE "temporary_earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate" FROM "earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`ALTER TABLE "temporary_earthquake" RENAME TO "earthquake"`);
        await queryRunner.query(`CREATE TABLE "temporary_location" ("latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" varchar, "country" varchar, "countryCode" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "id" varchar NOT NULL, PRIMARY KEY ("latitude", "longitude", "id"))`);
        await queryRunner.query(`INSERT INTO "temporary_location"("latitude", "longitude", "city", "country", "countryCode", "createdDate", "updatedDate") SELECT "latitude", "longitude", "city", "country", "countryCode", "createdDate", "updatedDate" FROM "location"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`ALTER TABLE "temporary_location" RENAME TO "location"`);
        await queryRunner.query(`CREATE TABLE "temporary_earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationId" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate" FROM "earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`ALTER TABLE "temporary_earthquake" RENAME TO "earthquake"`);
        await queryRunner.query(`CREATE TABLE "temporary_location" ("latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" varchar, "country" varchar, "countryCode" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "id" varchar PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_location"("latitude", "longitude", "city", "country", "countryCode", "createdDate", "updatedDate", "id") SELECT "latitude", "longitude", "city", "country", "countryCode", "createdDate", "updatedDate", "id" FROM "location"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`ALTER TABLE "temporary_location" RENAME TO "location"`);
        await queryRunner.query(`CREATE TABLE "temporary_earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationId" varchar, CONSTRAINT "FK_db77e238ad369c147f95ef73769" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE NO ACTION ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationId") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationId" FROM "earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`ALTER TABLE "temporary_earthquake" RENAME TO "earthquake"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "earthquake" RENAME TO "temporary_earthquake"`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationId" varchar)`);
        await queryRunner.query(`INSERT INTO "earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationId") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationId" FROM "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "temporary_earthquake"`);
        await queryRunner.query(`ALTER TABLE "location" RENAME TO "temporary_location"`);
        await queryRunner.query(`CREATE TABLE "location" ("latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" varchar, "country" varchar, "countryCode" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "id" varchar NOT NULL, PRIMARY KEY ("latitude", "longitude", "id"))`);
        await queryRunner.query(`INSERT INTO "location"("latitude", "longitude", "city", "country", "countryCode", "createdDate", "updatedDate", "id") SELECT "latitude", "longitude", "city", "country", "countryCode", "createdDate", "updatedDate", "id" FROM "temporary_location"`);
        await queryRunner.query(`DROP TABLE "temporary_location"`);
        await queryRunner.query(`ALTER TABLE "earthquake" RENAME TO "temporary_earthquake"`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate" FROM "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "temporary_earthquake"`);
        await queryRunner.query(`ALTER TABLE "location" RENAME TO "temporary_location"`);
        await queryRunner.query(`CREATE TABLE "location" ("latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" varchar, "country" varchar, "countryCode" varchar, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), PRIMARY KEY ("latitude", "longitude"))`);
        await queryRunner.query(`INSERT INTO "location"("latitude", "longitude", "city", "country", "countryCode", "createdDate", "updatedDate") SELECT "latitude", "longitude", "city", "country", "countryCode", "createdDate", "updatedDate" FROM "temporary_location"`);
        await queryRunner.query(`DROP TABLE "temporary_location"`);
        await queryRunner.query(`ALTER TABLE "earthquake" RENAME TO "temporary_earthquake"`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationLatitude" integer, "locationLongitude" integer)`);
        await queryRunner.query(`INSERT INTO "earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate" FROM "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "temporary_earthquake"`);
        await queryRunner.query(`ALTER TABLE "earthquake" RENAME TO "temporary_earthquake"`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "magnitude" integer NOT NULL, "time" datetime NOT NULL, "createdDate" datetime NOT NULL DEFAULT (datetime('now')), "updatedDate" datetime NOT NULL DEFAULT (datetime('now')), "locationLatitude" integer, "locationLongitude" integer, CONSTRAINT "FK_e4b0467fbac1ef0b4a857725277" FOREIGN KEY ("locationLatitude", "locationLongitude") REFERENCES "location" ("latitude", "longitude") ON DELETE NO ACTION ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "earthquake"("id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude") SELECT "id", "title", "magnitude", "time", "createdDate", "updatedDate", "locationLatitude", "locationLongitude" FROM "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "temporary_earthquake"`);
    }

}
