//Copy paste this code into the Knack builder Javascript area

//Change behaviour of modals
$(document).on('knack-modal-render.any', function () {

  //Add a back button next to the X in the modal header
  //Note that the CSS code contains styling for this, and the modal header in general
  //See section CUSTOM STYLING FOR MODAL HEADERS
  //Create the back button and insert on the page before the close button
  const $closeBtn = $('.modal-card-head .delete.close-modal');
  const $oldBackBtn = $('.modal-card-head .modal-back-btn');
  if($oldBackBtn.length) $oldBackBtn.remove();
  const $backBtn = $(`
    <span class="modal-back-btn">
      <i class="fa fa-arrow-left"></i>
    </span>  
  `);
  $backBtn.insertBefore($closeBtn);
  //On click of the close button navigate back 1
  $backBtn.off('click.backBtnHandler').on('click.backBtnHandler', function () {
    const previousPageHash = getPreviousPageHash();
    window.location.hash = previousPageHash;
  });
});

//Function to get previous page hash in a Knack app
function getPreviousPageHash(){
  return Knack.hash_scenes.map(i => i.key ? i.slug + '/' + i.key : i.slug).slice(0, -1).join('/')
}
