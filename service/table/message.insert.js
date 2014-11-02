function insert(item, user, request) {
    console.log("user is %j", user);
    item.sender = user.userId;
    request.execute();
}
