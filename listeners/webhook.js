/****************************************************
 Listeners
 ****************************************************/

listeners.defaultWebhookShipengine = {
    label: 'Catch HTTP shipengine events',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
        matching: {
            path: '/shipengine',
        }
    },
    callback: function(event) {
        sys.logs.info('Received Shipengine webhook. Processing and triggering a package event.');
        var body = JSON.stringify(event.data.body);
        var params = event.data.parameters;
        if(true) {
            sys.logs.info('Valid webhook received. Triggering event.');
            sys.events.triggerEvent('shipengine:webhook', {
                body: body,
                params: params
            });
            return "ok";
        }
        else throw new Error("Invalid webhook");
    }
};
