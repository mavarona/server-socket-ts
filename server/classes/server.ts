import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import socketio from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';
export default class Server {
    public app: express.Application;
    public port: number;
    private static _instance: Server;
    
    public io: SocketIO.Server;
    private httpServer: http.Server;
    
    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketio(this.httpServer);
        this.listenSockets();
    }

    private listenSockets(){
        this.io.on('connection', client => {
            //console.log('Client connected');
            socket.connectClient(client, this.io);
            socket.configUser(client,this.io);
            socket.message(client, this.io);
            socket.disconnect(client, this.io);
            socket.getUsers(client,this.io);
        });
    }

    public static get instance(){
        return this._instance || (this._instance = new this()); 
    }

    start( callback: Function){
        this.httpServer.listen(this.port, callback());
    }
}