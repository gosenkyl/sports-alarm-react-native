import { Notifications } from 'expo';
import { Actions } from 'react-native-router-flux';

const alarmImgSrc = "sports-alarm-react-native/app/assets/images/alarm_off.png";

let instance = null;

export default class {

    constructor() {
        if (!instance) {
            instance = this;
            this._addNotificationListener();
        }
        return instance;
    }

    async createNotification(game){
        let notification = this._getNotification("TITLE", "BODY", game);
        let schedule = this._getSchedule(new Date().getTime() + 3000);

        let notificationId = await Notifications.scheduleLocalNotificationAsync(notification, schedule);
        console.log(notificationId);
        return notificationId;
    }

    _getNotification(title, body, data){
        return {
            title: title,
            body: body, // (string) — body text of the notification.
            data: data,
            ios: { // (optional) (object) — notification configuration specific to iOS.
                sound: true // (optional) (boolean) — if true, play a sound. Default: false.
            },
            android: // (optional) (object) — notification configuration specific to Android.
            {
                sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
                icon: "https://image.freepik.com/free-icon/bedroom-circular-alarm-clock-tool_318-63380.jpg", //(optional) (string) — URL of icon to display in notification drawer.
                color: '#0D4D4D', //(optional) (string) — color of the notification icon in notification drawer.
                priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
                sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
                vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
                // link (optional) (string) — external link to open when notification is selected.
            }
        };
    }

    _getSchedule(time){
        return {
            time: time
            // repeat: (optional) (string) — 'minute', 'hour', 'day', 'week', 'month', or 'year'.
            // intervalMs: (Android Only) (optional) (number) — Repeat interval in number of milliseconds
        }
    }

    _addNotificationListener(){
        /*"data": Object {}
        "isMultiple": false
        "notificationId": -1054354054
        "origin": "selected"
        "remote": false*/

        Notifications.addListener((notification) => {
            let notificationId = notification.notificationId;
            if(notification.origin === "received"){
                console.log("RECEIVED ", notificationId);
            } else if(notification.origin === "selected"){
                console.log("SELECTED ", notificationId);
                let game = notification.data;
                Actions.notification({game: game});
            }
        });
    }

    cancelNotificationById(id){
        Notifications.cancelScheduledNotificationAsync(id);
    }

    cancelAllNotifications(){
        Notifications.cancelAllScheduledNotificationsAsync();
    }

}