document.addEventListener('DOMContentLoaded', function() {
    let address     = document.getElementById('address');
    let buttonStart = document.getElementById('buttonStart');
    let buttonLoad  = document.getElementById('buttonLoad');
    let buttonStop  = document.getElementById('buttonStop');
    let status      = document.getElementById('status');

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        address.innerHTML = tabs[0].url ?  tabs[0].url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm) : '';
    });

    buttonStart.addEventListener('click', function() {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            const url = tabs.length ? tabs[0].url : '';

            if (url.includes("alarm.com")) {
                status.innerHTML = 'Valid url';
                buttonStart.classList.remove('d-block');
                buttonLoad.classList.add('d-block');
                chrome.runtime.sendMessage({
                    action: 'start',
                    data: {
                        id: tabs[0].id,
                        url: tabs[0].url
                    }
                }, function(response) {
                    status.innerHTML = response.message;
                    if (response.status) {
                        buttonLoad.classList.remove('d-block');
                        buttonStop.classList.add('d-block');   
                    }
                });
            } else {
                status.innerHTML = 'Invalid url';
            }
        });
    });

    buttonStop.addEventListener('click', function() {
        buttonStop.classList.remove('d-block');
        buttonStart.classList.add('d-block');
    });

}, false);