import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnEmail1623933486894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
