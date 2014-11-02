function insert(item, user, request) {
    item.sender = user.userId;
	var parser = require("../shared/parseMsg.js");
    var codeTable = tables.getTable('code');
	var components = parser(item.content);
	components.forEach(function(entry, index){
		entry.order = index + 1;
		//entry.message_id = item.id;
	});
    request.execute({
    	success: function() {
    		console.log("%j",components);
    		request.respond();
    	}
    });
}
