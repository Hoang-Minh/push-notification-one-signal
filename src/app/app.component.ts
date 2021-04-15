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
    const OneSignal = window['OneSignal'] || [];
    OneSignal.SERVICE_WORKER_PARAM = { scope: '/assets/js/' };
    OneSignal.SERVICE_WORKER_PATH = '../assets/js/OneSignalSDKWorker.js';
    OneSignal.SERVICE_WORKER_UPDATER_PATH = '../assets/js/OneSignalSDKUpdaterWorker.js';

    const oneSignalInit = {
      appId: environment.oneSignalAppId,
      safari_web_id: environment.oneSignalSafariId,
      autoResubscribe: true,
      allowLocalhostAsSecureOrigin: true,
      promptOptions: {
        slidedown: {
          enabled: true,
          autoPrompt: true,
          timeDelay: 5,
          //pageViews: 3,
          actionMessage: "We'd like to show you notifications for the latest news and updates.",
          acceptButtonText: "ALLOW",
          cancelButtonText: "NO THANKS",
        }
      },
      notifyButton: {
        enable: true
      },
      persistNotification: false
    }        

    OneSignal.push(['init', oneSignalInit]);
    

    console.log('2. OneSignal Initialized', OneSignal);

    OneSignal.push(() => {
      console.log('3. Register For Push');

      OneSignal.push(['registerForPushNotifications']);

      OneSignal.getUserId().then((userId) => {
          console.log('4. User ID is', userId);
        });             
    });

    OneSignal.push(() => {

      OneSignal.on('subscriptionChange', (isSubscribed) => {
        console.log('The users subscription state is now:', isSubscribed);

        if(isSubscribed) {

          console.log(`The users subscription state is now: ${isSubscribed}. Trying to set externalId`);
          OneSignal.setExternalUserId("E026FC3C-2E06-46F6-A8D1-ABF5CC98E9EC");
        }

        // OneSignal.getUserId().then((userId) => {
        //   console.log('5. User ID is from subscription change', userId);
        // });
      });

      console.log('6. OneSignal Initialized', OneSignal);

    });
    
  }
}
