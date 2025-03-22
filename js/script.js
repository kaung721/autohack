const iframe = document.getElementById('api-frame');
const uid = '6bc1e361969849eb99b45c933fb85e2f'; // Civic model UID
const client = new Sketchfab('1.12.1', iframe);

client.init(uid, {
    success: function(api) {
        api.start();
        api.addEventListener('viewerready', function() {
            console.log('Sketchfab viewer is ready');

            iframe.addEventListener('click', function(event) {
                const rect = iframe.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                api.pick(x, y, function(result) {
                    if (result && result.instanceID !== undefined) {
                        api.getNode(result.instanceID, function(node) {
                            alert('You clicked on: ' + node.name);
                        });
                    }
                });
            });
        });
    },
    error: function() {
        console.error('Sketchfab API error');
    }
});


document.addEventListener('click', (event) => {
    console.log(event.target);
})