function insert(item, user, request) {
    request.execute();
    // Set timeout to delay the notification, to provide time for the
    // app to be closed on the device to demonstrate toast notifications
    push.apns.send(item.deviceToken, {
        alert: "Toast: " + item.content,
        payload: {
            inAppMessage: "Hey, a new item arrived: '" + item.sender + "'"
        }
    });
}