import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;
  public user: User = null;

  // tslint:disable-next-line:variable-name
  constructor(private _socket: Socket) {
    this.loadStorage();
    this.checkStatus();
  }

  getUser() {
    return this.user;
  }

  checkStatus() {
    this._socket.on('connect', () => {
      console.log('Connect to the server');
      this.socketStatus = true;
      this.loadStorage();
    });
    this._socket.on('disconnect', () => {
      console.log('Disconnect to the server');
      this.socketStatus = false;
    });
  }

  // tslint:disable-next-line:ban-types
  emit(event: string, payload?: any, callback?: Function){
    this._socket.emit(event, payload, callback);
  }

  listen(event: string) {
    return this._socket.fromEvent(event);
  }

  loginWS(name: string) {
    return new Promise((resolve, reject) => {
      this.emit('config-user', {name}, resp => {
        this.user = new User(name);
        this.saveStorage();
        resolve();
      });
    });
  }

  saveStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadStorage() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.loginWS(this.user.name);
    }
  }

}
