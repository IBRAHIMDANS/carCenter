import { NextFunction, Request, Response } from 'express';
import multer from 'src/middlewares/multer';


export default async (
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> => {

    const upload = multer({ storage: multer.memoryStorage(), limits: { fieldSize: 25 * 1024 * 1024 } }).single('image');

    upload(request, response, (err: any) => {
        if (err) next(err);
        next();
    });
};
