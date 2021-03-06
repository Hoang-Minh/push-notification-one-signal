import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'push-notification-one-signal';

  ngOnInit(): void {

    console.log('1. Init OneSignal');
    
    const oneSignal = window["OneSignal"] || [];
    console.log("app id", environment.oneSignalSafariId);

    const initConfig = {
      appId: environment.oneSignalAppId,
      safari_web_id: environment.oneSignalSafariId,
      autoResubscribe: true,
      allowLocalhostAsSecureOrigin: true,
      promptOptions: {
        slidedown: {
          enabled: true,              
          timeDelay: 5,
          //pageViews: 3,
          actionMessage: "We'd like to show you notifications for the latest news and updates from Partie.",
          acceptButtonText: "ALLOW",
          cancelButtonText: "NO THANKS"              
        },            
      },
      notifyButton: {
        enable: true
      },
      persistNotification: false          
    };        

    oneSignal.push(function() { 

      oneSignal.SERVICE_WORKER_PARAM = { scope: '/assets/js/' };
      oneSignal.SERVICE_WORKER_PATH = '../assets/js/OneSignalSDKWorker.js';
      oneSignal.SERVICE_WORKER_UPDATER_PATH = '../assets/js/OneSignalSDKUpdaterWorker.js';
      oneSignal.init(initConfig);
     });
    
  }
}
