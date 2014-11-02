exports.batchInsert = function(table, records, nRecords, batchSize, done) {
	var totalCount = 0;
	var errorCount = 0;

	function insertItems() {        
        var batchCompletedCount = 0;  

        var insertComplete = function() { 
            batchCompletedCount++; 
            totalCount++; 
            if(batchCompletedCount === batchSize || totalCount === nRecords) {                        
                if(totalCount < nRecords) {
                    // kick off the next batch 
                    insertItems(); 
                } else { 
                    // or we are done, report the status of the job 
                    // to the log and don't do any more processing  
                    done();
                    console.log("Insert complete. %d Records processed. There were %d errors.", totalCount, errorCount); 
                } 
            } 
        }; 

        var errorHandler = function(err) { 
            errorCount++; 
            console.warn("Ignoring insert failure as part of batch.", err); 
            insertComplete(); 
        };

        for(var i = 0; i < batchSize; i++) { 
            var item = records.shift();
            if (item) {
            	table.insert(item, { 
                	success: insertComplete, 
                	error: errorHandler 
            	});  	
            }
        } 
    } 

    insertItems(); 

}
