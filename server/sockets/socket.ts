import { Socket } from 'socket.io';
import socketio from 'socket.io';

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client disconnect');
    })
}

export const message = (client: Socket, io: socketio.Server) => {
    client.on('message', ( payload: any ) => {
        console.log('message received ', payload);
        io.emit('new-message', payload);
    });
}

export const configUser = (client: Socket, io: socketio.Server) => {
    client.on('config-user', ( payload: {name: string}, callback : Function ) => {
        console.log('config user ', payload.name);
        callback({
            ok: true,
            message: `User ${payload.name} configured`
        });
    });
}