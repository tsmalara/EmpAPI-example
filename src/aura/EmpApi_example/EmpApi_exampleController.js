({
	doInit : function(cmp, event, helper, isinit) {
        var empApi = cmp.find("empApi");

        // Error handler function that prints the error to the console.
        var errorHandler = function (message) {
            console.log("Received error ", message);
        }.bind(this);

        // Register the error listener and pass in the error handler function.
        empApi.onError(errorHandler);

        var channel='/event/Demo_EmpApi_Event__e';
        var sub;

        // use -1 for new events
        var replayId=-1;

        var callback = function (message) {
            cmp.find('notifLib').showToast({
                "title": "Event Received!",
                "message": message.data.payload.Message__c
                });        
        }.bind(this);

        empApi.subscribe(channel, replayId, callback).then(function(value) {
            console.log("Subscribed to channel " + channel);
            sub = value;
            cmp.set("v.sub", sub);
        });
    },
    doPublishEvent : function(cmp, event){
		var action = cmp.get("c.publishEvent");  
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (cmp.isValid() && state === "SUCCESS") {
				console.log("Event published successfully!");
			}
			else {
				console.log("Failed with state: " + state);
			}
		});
		$A.enqueueAction(action);
	}
})