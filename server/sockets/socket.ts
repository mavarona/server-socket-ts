import { Socket } from 'socket.io';
import * as socketio from 'socket.io';
import { UserList } from '../classes/userList';
import { User } from '../classes/user';

export const userConnected = new UserList();

export const connectClient = (client: Socket, io: socketio.Server) => {
    const user: User = new User( client.id );
    userConnected.addUser(user);
}

export const disconnect = (client: Socket, io: socketio.Server) => {
    client.on('disconnect', () => {
        console.log('Client disconnect');
        userConnected.deleteUser(client.id);
        io.emit('active-users', userConnected.getUsers());
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
        userConnected.updateName(client.id, payload.name);
        io.emit('active-users', userConnected.getUsers());
        callback({
            ok: true,
            message: `User ${payload.name} configured`
        });

    });
}

export const getUsers = (client: Socket, io: socketio.Server) => {
    client.on('get-users', ( ) => {
        io.to(client.id).emit('active-users', userConnected.getUsers());
    });
}
