import { CommonRoutesConfig } from '../../Common/common.routes.config';
import express, { Request, Response } from 'express';
import { User } from '../../Entities/User';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import argon2 from 'argon2';

export class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app.route('/login').post(async (req: Request, res: Response) => {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: { username },
      });

      const token = v4();

      if (!user) {
        const hashedPassword = await argon2.hash(password);
        const newUser = await getConnection()
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            username,
            password: hashedPassword,
          })
          .returning('*')
          .execute();
        res.send({
          username: newUser.raw[0].username,
          token,
        });
      } else {
        const validatePassword = await argon2.verify(user.password, password);
        if (!validatePassword) {
          res.send({ error: 'Invalid password' });
        } else {
          res.send({
            username: user.username,
            token,
          });
        }
      }
    });

    return this.app;
  }
}
