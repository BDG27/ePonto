import 'dotenv/config';
import path from 'path';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  entities: [`${path.resolve('./')}/src/modules/**/typeorm/entities/*.{ts,js}`],
  migrations: [`${path.resolve('./')}/src/shared/**/migrations/*.{ts,js}`]
});
