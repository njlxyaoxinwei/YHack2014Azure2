function insert(item, user, request) {
	console.log("user is %j", user);
    request.execute();
    // Set timeout to delay the notification, to provide time for the
    // app to be closed on the device to demonstrate toast notifications
    setTimeout(function() {
        console.log(typeof item.deviceToken);
        push.apns.send("uniqueTag", {
            alert: "Toast: " + item.text,
            payload: {
                inAppMessage: "You've been equation-ized! " //+ item.text + "'"
            }
        }, function(error) {console.log(error);} );
    }, 2500);
}
