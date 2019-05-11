import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socketStatus = false;

  // tslint:disable-next-line:variable-name
  constructor(private _socket: Socket) {
    this.checkStatus();
  }


  checkStatus() {
    this._socket.on('connect', () => {
      console.log('Connect to the server');
      this.socketStatus = true;
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

}
