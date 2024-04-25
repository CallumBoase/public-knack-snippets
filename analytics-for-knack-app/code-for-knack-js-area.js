let sessionStartLogSent = false;

$(document).on('knack-scene-render.any', function(event, scene){

  //Send session start log if we haven't yet sent it yet (in this new tab "session")
  if(sessionStartLogSent === false) {
    sendLog('Session start in new tab', scene);
    sessionStartLogSent = true;
  }

  //Send the scene render log every time a page loads
  sendLog('Scene render', scene);

});

//Helper function to send the logs to Make.com via a webhook url
async function sendLog(eventString, scene) {

  //Build the log data that we will send
  const logData = {
    event: eventString,
    fullUrlHash: decodeURIComponent(window.location.hash),
    urlHashNoQuery: scene.slug,
    fullUrl: window.location.href,
    sceneName: scene.name,
    sceneKey: scene.key,
    recordId: scene.scene_id || "N/A"
  }

  //Send the actual log to Make.com webhook
  const loggingUrl = 'YOUR-MAKE-WEBHOOK-URL-HERE'

  await fetch(loggingUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logData)
  });

}
