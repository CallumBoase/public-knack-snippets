//Make view_2 resizable
//Replace view_2 with the view you want to make resizable
$(document).on('knack-view-render.view_2', function (event, view, records) {
  makeResizable(view);
});

//Helper functions
function makeResizable(view) {
  $(`#${view.key}`).resizable({
    handles: 'e',//Only allow resizing from the right side
  });

  //Add slight right margin and resize icon to indicate to user that it's resizeable
  $(`#${view.key}`).css('borderRight', '1px dashed rgba(0, 0, 0, 0.1)');
  const $leftRightIconStyled = $leftRightIcon.css({
    float: 'right',
    marginRight: '-7px'
  });
  $(`#${view.key}`).prepend($leftRightIconStyled);
}

//Extra icons
var $leftRightIcon = $(`
  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#c2c2c2}</style><path d="M504.3 273.6c4.9-4.5 7.7-10.9 7.7-17.6s-2.8-13-7.7-17.6l-112-104c-7-6.5-17.2-8.2-25.9-4.4s-14.4 12.5-14.4 22l0 56-192 0 0-56c0-9.5-5.7-18.2-14.4-22s-18.9-2.1-25.9 4.4l-112 104C2.8 243 0 249.3 0 256s2.8 13 7.7 17.6l112 104c7 6.5 17.2 8.2 25.9 4.4s14.4-12.5 14.4-22l0-56 192 0 0 56c0 9.5 5.7 18.2 14.4 22s18.9 2.1 25.9-4.4l112-104z"/></svg>
`)
