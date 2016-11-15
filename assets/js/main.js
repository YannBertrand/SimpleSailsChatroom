$(document).ready(function () {
  var currentUser = {};

  $('form').on('submit', function () {
    var userName = $('input#user-name').val();
    io.socket.post('/user', { name: userName }, function (user, jwres) {
      currentUser = user;
      $('#login-modal').modal('hide');
    });

    return false;
  });

  $('#login-modal').modal({
    backdrop: 'static',
    keyboard: false,
  });
});
