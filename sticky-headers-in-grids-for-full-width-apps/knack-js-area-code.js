//Make all grid views have sticky headers and take up max 85% of screen height
$(document).on('knack-records-render.table', function(event, view, records){
  $('#' + view.key + ' th').css({"position": "sticky", "top": "0px", "border-top": "0px", "z-index": "2"});
  $('#' + view.key + ' .kn-table-wrapper').css('max-height', '85vh')
});
