$(document).ready(function () {
  $('form').on('submit', function () {
    var userName = $('input#user-name').val();
    io.socket.post('/user', { name: userName }, function (user, jwres) {
      $('#login-modal').modal('hide');

      launchChatroom(user);
    });

    return false;
  });

  $('#login-modal').modal({
    backdrop: 'static',
    keyboard: false,
  });
});

function launchChatroom(currentUser) {
  var usersTemplate = new EJS('../templates/users.ejs');

  io.socket.get('/user?isOnline=true', function (onlineUsers) {
    $('#online-users').html(usersTemplate.render({ onlineUsers: onlineUsers }));
  });

  $('input#message').prop('disabled', false).focus();
  $('button#send-message').prop('disabled', false);
}
