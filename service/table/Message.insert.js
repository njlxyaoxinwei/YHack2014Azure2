function insert(item, user, request) {
    item.sender = user.userId;
    request.execute({
    	success: function(result) {
		    var parser = require("../shared/parseMsg.js");
		    var components = parser(item.content);
		    var codeTable = tables.getTable('code');
    		console.log(result);
    		components.forEach(function(entry, index){
    			entry.order = index + 1;
    		});
    		console.log(components);
    		request.respond();
    	}
    });
}
