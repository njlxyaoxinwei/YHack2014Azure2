function insert(item, user, request) {
    item.sender = user.userId;
	var parser = require("../shared/parseMsg.js");
    request.execute({
    	success: function() {
		    var components = parser(item.content);
		    var codeTable = tables.getTable('code');
    		components.forEach(function(entry, index){
    			entry.order = index + 1;
    			entry.message_id = item.id;
    		});
    		console.log(components);
    		request.respond();
    	}
    });
}
