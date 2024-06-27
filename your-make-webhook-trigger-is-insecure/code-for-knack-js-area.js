//On submit of the form view_4, trigger Make scenario with a custom wehook trigger
$(document).on('knack-form-submit.view_4', function(event, view, record){
  triggerWebhookWithUserToken({
    url: 'PUT YOUR WEBHOOK URL HERE',
  });
})

//Helper function to trigger a custom Make webhook trigger
function triggerWebhookWithUserToken(props) {
  fetch(props.url, {
    method: 'POST',
    headers: {
      userToken: Knack.getUserToken()
    },
    body: props.data ? JSON.stringify(props.data) : undefined
  })
}
