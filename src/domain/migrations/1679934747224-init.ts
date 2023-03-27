import { MigrationInterface, QueryRunner } from "typeorm";

export class init1679934747224 implements MigrationInterface {
    name = 'init1679934747224'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "location" ("id" varchar PRIMARY KEY NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, "city" varchar NOT NULL, "country" varchar NOT NULL, "countryCode" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "time" datetime NOT NULL, "locationId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "time" datetime NOT NULL, "locationId" varchar, CONSTRAINT "FK_db77e238ad369c147f95ef73769" FOREIGN KEY ("locationId") REFERENCES "location" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_earthquake"("id", "title", "time", "locationId") SELECT "id", "title", "time", "locationId" FROM "earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`ALTER TABLE "temporary_earthquake" RENAME TO "earthquake"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "earthquake" RENAME TO "temporary_earthquake"`);
        await queryRunner.query(`CREATE TABLE "earthquake" ("id" integer PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "time" datetime NOT NULL, "locationId" varchar)`);
        await queryRunner.query(`INSERT INTO "earthquake"("id", "title", "time", "locationId") SELECT "id", "title", "time", "locationId" FROM "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "temporary_earthquake"`);
        await queryRunner.query(`DROP TABLE "earthquake"`);
        await queryRunner.query(`DROP TABLE "location"`);
    }

}
