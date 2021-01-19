import 'dotenv-safe/config';
import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { User } from './Entities/User';
import { CommonRoutesConfig } from './Common/common.routes.config';
import { UserRoutes } from './Endpoints/user/user.routes.config';
import cors from 'cors';
import path from 'path';

const main = async () => {
  const routes: Array<CommonRoutesConfig> = [];

  const conn = await createConnection({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [User],
  });

  await conn.runMigrations();

  const app: express.Application = express();

  app.use(bodyParser.json());
  app.use(cors());

  routes.push(new UserRoutes(app));

  app.listen(process.env.PORT, () => {
    console.log('Running on port : ', process.env.PORT);
  });
};

main().catch((err) => {
  console.log(err);
});
