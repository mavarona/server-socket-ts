import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/messages', ( req: Request, res: Response)=>{
    res.json({
        ok: true,
        message: 'Wellcome'
    })
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
    server.io.in(id).emit('message', payload);
});

export default router;