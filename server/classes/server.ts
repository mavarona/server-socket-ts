import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import socketio from 'socket.io';
import http from 'http';
export default class Server {
    public app: express.Application;
    public port: number;
    
    public io: SocketIO.Server;
    private httpServer: http.Server;
    
    constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketio(this.httpServer);
        this.listenSockets();
    }

    private listenSockets(){
        this.io.on('connection', client => {
            console.log('Client connected');
        });
    }

    start( callback: Function){
        this.httpServer.listen(this.port, callback);
    }
}