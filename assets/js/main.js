$(document).ready(function () {
  // Create a user on submit (using websockets)
  $('form#login-form').on('submit', function () {
    var userName = $('input#user-name').val();

    io.socket.post('/user', { name: userName }, function (user, jwres) {
      $('#login-modal').modal('hide');

      launchChatroom(user);
    });

    return false;
  });

  // Open the modal when document is ready
  $('#login-modal').modal({
    backdrop: 'static',
    keyboard: false,
  });
});

function launchChatroom(currentUser) {
  var $messagesList = $('#messages-list');
  var $onlineUsers = $('#online-users');
  var $message = $('input#message');

  var messagesTemplate = new EJS({ url: '/templates/messages.ejs' });
  var messageTemplate = new EJS({ url: '/templates/message.ejs' });
  var usersTemplate = new EJS({ url: '/templates/users.ejs' });
  var userTemplate = new EJS({ url: '/templates/user.ejs' });

  // Subscribe to the messages
  io.socket.get('/message', function (messages) {
    $messagesList.html(messagesTemplate.render({ messages: messages }));
  });

  // Subscribe to the users
  io.socket.get('/user?isOnline=true', function (onlineUsers) {
    $onlineUsers.html(usersTemplate.render({ onlineUsers: onlineUsers }));
  });

  // Create a message on submit
  $('form#message-form').on('submit', function () {
    var message = $message.val();
    io.socket.post('/message', { user: currentUser, content: message });
    $message.val('');

    return false;
  });

  // When there is a creation/update of a user
  io.socket.on('user', function (event) {
    if (event.verb === 'created') {
      $onlineUsers.append(userTemplate.render({ user: event.data }));
    }
  });

  // Enable the message input and submit button
  $message.prop('disabled', false).focus();
  $('button#send-message').prop('disabled', false);
}
