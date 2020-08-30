import Express, { Router } from 'express';
import user from './userRoutes';

const api = Router();

api.get('/', (req: Express.Request, res: Express.Response) => {
    res.json({
        'project Name': 'car Center',
        author: ['Ibrahima Dansoko'],
        apiRoute: {
            Users: [
                {
                    name: 'Get All User',
                    method: 'Get',
                    url: `${process.env.HOST}/api/users`,
                    protected: 'Yes',
                },
                {
                    name: 'Get User by Id',
                    method: 'Get',
                    url: `${process.env.HOST}/api/users/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Post User',
                    method: 'Post',
                    url: `${process.env.HOST}/api/users`,
                    protected: 'Yes',
                },
                {
                    name: 'Update User by id',
                    method: 'Patch',
                    url: `${process.env.HOST}/api/users/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Delete User by id',
                    method: 'Delete',
                    url: `${process.env.HOST}/api/users/:id`,
                    protected: 'Yes',
                },
                {
                    name: 'Truncate user in bdd',
                    method: 'Delete',
                    warning: 'DEV only',
                    url: `${process.env.HOST}/api/users/truncate`,
                    protected: 'No',
                },
            ],
        },
    }).end();
});
api.use('/users', user);

export default api;
