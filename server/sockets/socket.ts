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