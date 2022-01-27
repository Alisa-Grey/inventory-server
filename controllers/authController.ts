import { Request, Response, NextFunction } from 'express';
const ErrorHandler = require('../middleware/errorMiddleware');
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Employee from '../models';

const generateJwt = (id: number, email: string, isAdmin: boolean) => {
    return jwt.sign(
        { id, email, isAdmin }, 
        process.env.SECRET_KEY as string,
        {expiresIn: '24h'}            
    );
}

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, lastName, email, password, phone, isAdmin} = req.body;
            if(!email || !password) {
                throw res.status(403).send('Invalid email or password');
            }
            const candidate = await Employee.findOne({where: {email}});
            if(candidate) {
                throw res.status(500).send('User with this email already exists');
            }
            const hashPassword = await bcrypt.hash(password, 2);
            const employee = await Employee.create({name, lastName, email, password: hashPassword, phone, isAdmin});

            const token = generateJwt(employee.id, employee.email, employee.isAdmin);
            res.set('Auth-Token', token);
            return res.json({
                name: employee.name,
                lastName: employee.lastName,
                email: employee.email,
                phone: employee.phone,
                isAdmin: employee.isAdmin
            })
        } catch(err) {
            next(ErrorHandler.badRequest((err as Error).message))
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const employee = await Employee.findOne({
                where: { email }
            });
            if (!employee) {
                return res.status(404).json({message: 'User not found'});
            }
            let comparePassword = bcrypt.compareSync(password, employee.password);
            if (!comparePassword) {
                return res.status(500).json({message: 'Incorrect password'});
            };

            const token = generateJwt(employee.id, employee.email, employee.isAdmin);
            res.set('Auth-Token', token);

            return res.json({
                token: token,
                employee: {
                    name: employee.name,
                    lastName: employee.lastName,
                    email: employee.email,
                    phone: employee.phone,
                }
               });
        }
        catch(err: any){
            next(ErrorHandler.badRequest(err.message));
        }
    }
}

const authController = new AuthController();
export default authController;