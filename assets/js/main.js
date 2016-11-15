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
  var usersTemplate = new EJS({ url: '/templates/users.ejs' });

  var users = [];
  var messages = [];

  // Subscribe to the messages
  io.socket.get('/msg', function (_messages) {
    messages = _messages;
    updateMessagesTemplate();
  });

  // Subscribe to the users
  io.socket.get('/user', function (_users) {
    users = _users;
    updateUsersTemplate();
  });

  // Create a message on submit
  $('form#message-form').on('submit', function () {
    var message = $message.val();
    io.socket.post('/msg', { user: currentUser, content: message });
    $message.val('');

    return false;
  });

  // When there is a creation/update of a user
  io.socket.on('user', function (event) {
    if (event.verb === 'created') {
      users.push(event.data);
      updateUsersTemplate();
    }
  });

  // When there is a creation/update of a message
  io.socket.on('msg', function (event) {
    if (event.verb === 'created') {
      // Hydrate the user (to display its name)
      var message = event.data;
      message.user = users[_.findLastIndex(users, { id: message.user })];

      messages.push(message);
      updateMessagesTemplate();
    }
  });

  // Enable the message input and submit button
  $message.prop('disabled', false).focus();
  $('button#send-message').prop('disabled', false);

  function updateMessagesTemplate() {
    $messagesList.html(messagesTemplate.render({ messages: messages }));
  }

  function updateUsersTemplate() {
    $onlineUsers.html(usersTemplate.render({ 'onlineUsers': users }));
  }
}
