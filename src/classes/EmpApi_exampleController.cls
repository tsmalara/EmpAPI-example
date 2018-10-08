public class EmpApi_exampleController {

    @AuraEnabled
    public static void publishEvent()
    { 
        System.debug('Published Event!');
        Demo_EmpApi_Event__e event = new Demo_EmpApi_Event__e();
        
        Database.SaveResult result = EventBus.publish(event);
        
        if (!result.isSuccess()) {
            for (Database.Error error : result.getErrors()) {
                System.debug('Error returned: ' + error.getStatusCode() +' - '+ error.getMessage());
            }
        }
    }
}