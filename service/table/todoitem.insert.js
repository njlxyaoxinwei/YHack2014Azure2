function insert(item, user, request) {
	console.log("user is %j", user);
    request.execute();
    // Set timeout to delay the notification, to provide time for the
    // app to be closed on the device to demonstrate toast notifications
    setTimeout(function() {
        console.log(typeof item.deviceToken);
        push.apns.send(null, {
            alert: "Toast: " + item.text,
            payload: {
                "inAppMessage": "Hey, a new item arrived: '" + item.text + "'"
            }
        });
    }, 2500);
}
