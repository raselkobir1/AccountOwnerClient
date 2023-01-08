import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor() { }
  private hubConnection: any;
  public startConnection = () => {
    const apiUri: string = `notification`;
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(apiUri, {accessTokenFactory: () => localStorage.getItem('userToken')})
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection.start()
      .then(() => console.log('Connection started'))
      // .then(() => this.GetConnectionId())
      .catch((err: any) => console.log('Error while starting connection: ' + err));
  }

  public NotificationListener: any = () => {
    this.hubConnection.on('notification', (data: any) => {
      console.log(data);
      console.log('notification listioner connected');
      //this.GetNotificationCount();
      if (data.message && data.message.trim() !== '') {
        //this.notificationService.showNotification(data.message, data.title);
        //console.log('notification listioner connected');
      }
      // const sound = new Howl({
      //   src: ['../../../assets/sound/cute_notification.mp3']
      // });
      // sound.play();
    });
  }
}
