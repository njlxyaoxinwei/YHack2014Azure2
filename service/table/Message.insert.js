function insert(item, user, request) {
    item.sender = user.userId;
	var parser = require("../shared/parseMsg").parser;
	var batchInsert = require("../shared/batchInsert").batchInsert;
	var codeTable = tables.getTable('code');
    request.execute({
    	success: function() {
			var components = parser(item.content);
			components.forEach(function(entry, index){
				entry.order = index + 1;
				entry.message_id = item.id;
			});
			batchInsert(codeTable, components, components.length, 10);
	   		request.respond();
    	}
    });
}
