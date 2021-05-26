function getDocument() {
    return document.body.innerText;
}

chrome.runtime.onInstalled.addListener(() => {

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(request);
        if (request.action == 'start') {
            chrome.scripting.executeScript({
                target: { 
                    tabId: request.data.id, 
                    allFrames: true
                },
                function: getDocument
            }, (result) => {
                setTimeout(() => {
                    if (result.length) {
                        const text = result[0].result.toLowerCase();
                        if (text.includes('customer login')) {
                            sendResponse({
                                status: true,
                                message: 'Customer Login is detected'
                            });
                        } else {
                            sendResponse({
                                status: false,
                                message: 'Customer Login is not found'
                            });
                        }
                    } else {
                        sendResponse({
                            status: false,
                            message: 'Customer Login is not found'
                        });
                    }
                }, 2000);
            });
            return true;
        } else {
            return true;
        }

    });
});