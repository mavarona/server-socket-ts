import { Router, Request, Response } from 'express';

const router = Router();

router.get('/messages', ( req: Request, res: Response)=>{
    res.json({
        ok: true,
        message: 'Wellcome'
    })
});

export default router;