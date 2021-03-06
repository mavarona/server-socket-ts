import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { userConnected } from '../sockets/socket';

const router = Router();

router.get('/messages', ( req: Request, res: Response)=>{
    res.json({
        ok: true,
        message: 'Wellcome'
    })
});

router.post('/messages', (req: Request, res: Response) => {
    const body = req.body.body;
    const from = req.body.from;

    const payload = {
        from,
        body
    }

    const server = Server.instance;
    server.io.emit('new-message', payload);
});

router.post('/messages/:id', (req: Request, res: Response) => {
    const body = req.body.body;
    const from = req.body.from;
    const id = req.params.id;

    const payload = {
        from,
        body
    }

    const server = Server.instance;
    server.io.in(id).emit('private-message', payload);
});

router.get('/users', (req: Request, res: Response) => {
    const server = Server.instance;
    server.io.clients((err: any, clients: Array<string>) => {
        if(err){
            return res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            clients
        })
    });
});

router.get('/users/detail', (req: Request, res: Response) => {
    res.json({
        ok: true,
        clients: userConnected.getUsers()
    })
});

export default router;