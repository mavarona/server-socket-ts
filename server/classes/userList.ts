import { User } from './user';

export class UserList {
    private list: Array<User> = new Array<User>();
    constructor(){}
    public addUser(user: User) {
        this.list.push(user);
    }
    public updateName(id: string, name: string) {
        for(let user of this.list){
            if(user.id === id){
                user.name = name;
                break;
            }
        }
    }
    public getUsers(): Array<User> {
        return this.list;
    }
    public getUser(id: string) {
        return this.list.find( user => user.id === id);
    }
    public getUserInRoom(room: string) {
        return this.list.filter( user => user.room === room);
    }
    public deleteUser(id: string) {
        const userTemp = this.getUser(id); 
        this.list = this.list.filter( user => user.id != id);
        return userTemp;
    }
}