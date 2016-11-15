$(document).ready(function () {
  $('form').on('submit', function () {
    return false;
  });

  $('#login-modal').modal({
    backdrop: 'static',
    keyboard: false,
  });
});
