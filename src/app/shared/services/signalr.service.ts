import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Router} from '@angular/router';
import {Howl} from 'howler';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  constructor(private notification: NotificationService) { }
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
      if (data.message && data.message.trim() !== '') {
        this.notification.showNotification(data.message, data.title);
      }
      console.log('SignalR NotificationListener',data);
      const sound = new Howl({
        src: ['../../../assets/sound/cute_notification.mp3']
      });
      sound.play();
      // alert('notification listener call'); 
    });
  }
}
