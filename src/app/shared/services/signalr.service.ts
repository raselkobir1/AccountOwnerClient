import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }
  private hubConnection: signalR.HubConnection;
  public data ;
  public startConnection = () => {
    const apiUri: string = `http://localhost:7098/notification`;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(apiUri, {accessTokenFactory: () => localStorage.getItem('userToken')})
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
      console.log('Build connection');
    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      // .then(() => this.GetConnectionId())
      .catch((err: any) => console.log('Error while starting connection: ' + err));
  }

  public NotificationListener: any = () => {
    this.hubConnection.on('notification', (data: any) => {
      this.data = data;
      console.log('SignalR NotificationListener',data);
      // alert('notification listener call');
    });
  }
}
