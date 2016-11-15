$(document).ready(function () {
  $('form#login-form').on('submit', function () {
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
  var $messagesList = $('#messages-list');
  var $onlineUsers = $('#online-users');

  var messagesTemplate = new EJS({ url: '/templates/messages.ejs' });
  var messageTemplate = new EJS({ url: '/templates/message.ejs' });
  var usersTemplate = new EJS({ url: '/templates/users.ejs' });
  var userTemplate = new EJS({ url: '/templates/user.ejs' });

  io.socket.get('/message', function (messages) {
    $messagesList.html(messagesTemplate.render({ messages: messages }));
  });

  io.socket.get('/user?isOnline=true', function (onlineUsers) {
    $onlineUsers.html(usersTemplate.render({ onlineUsers: onlineUsers }));
  });

  $('form#message-form').on('submit', function () {
    var message = $('input#message').val();
    io.socket.post('/message', { user: currentUser, content: message });

    return false;
  });

  io.socket.on('user', function (event) {
    if (event.verb === 'created') {
      $onlineUsers.append(userTemplate.render({ user: event.data }));
    }
  });

  $('input#message').prop('disabled', false).focus();
  $('button#send-message').prop('disabled', false);
}
