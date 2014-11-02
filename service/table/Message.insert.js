function insert(item, user, request) {
    item.sender = user.userId;
	var parser = require("../shared/parseMsg").parser;
	var batchInsert = require("../shared/batchInsert").batchInsert;
	var codeTable = tables.getTable('code');
	var components = parser(item.content);
	if (components) {
	    request.execute({
	    	success: function() {
				components.forEach(function(entry, index){
					entry.order = index + 1;
					entry.message_id = item.id;
				});
				batchInsert(codeTable, components, components.length, 10, do_push(request, push, item.recipient));
	    	}
	    });		
	} else {
		request.respond(419, {error: "Invalid syntax"});
	}
}

var do_push = function(request, push, recipient) {
	return function(){
		push.apns.send(recipient, {
			alert: "Toast: You have a new LaTeX message",
			payload: {
				inAppMessage: "You've been equation-ized!"
			}
		}, function(err){console.log(err)});
		request.respond();		
	}
};
