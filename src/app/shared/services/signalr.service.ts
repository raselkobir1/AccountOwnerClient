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
    //alert('start signalR connection')
    const apiUri: string = `http://localhost:7098/notification`;
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
    //alert('call signalR notification litioner')
    this.hubConnection.on('notification', (data: any) => {
      console.log('SignalR NotificationListener',data);
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
