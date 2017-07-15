exports.setApp = app => {
    app.ws('/snapshot', (ws, request) => {
        ws.on('message', msg => {
        	console.log('Server received:', msg);
        });

        //send snapshot
    });
};