function insert(item, user, request) {
    item.sender = user.userId;
	var parser = require("../shared/parseMsg.js");
    var codeTable = tables.getTable('code');
	var components = parser(item.content);
    request.execute({
    	success: function() {
			components.forEach(function(entry, index){
				entry.order = index + 1;
				entry.message_id = item.id;
			});
    		console.log("%j",components);
    		request.respond();
    	}
    });
}
