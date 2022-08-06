import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1659814315048 implements MigrationInterface {
  name = 'default1659814315048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`schedules\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`schedules\` ADD CONSTRAINT \`FK_19c54f24597b318be3892114c75\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`schedules\` DROP FOREIGN KEY \`FK_19c54f24597b318be3892114c75\``
    );
    await queryRunner.query(`DROP TABLE \`schedules\``);
  }
}
