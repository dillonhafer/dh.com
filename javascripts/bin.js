function initializeBash() {
  // Set login time
  setLoginTime();
  
  // Add event handler for keypress
  $(document).keypress(function(e) {
      if(e.which == 13) {        
        var inputField = $('input:focus');
        var command = inputField.val();

        inputField.attr('disabled', 'disabled');
        
        $('.command-results').last().html(execute(command));
        $('.command-results').last().append(createCommand());
        $('.command-prompt').slideDown('fast');
        $('.command-results').slideDown('slow');
        $('input').last().focus();
      }
  });
}

function setLoginTime() {
  var d = new Date();
  var s = d.toDateString().split('\ ');
  localStorage["first-visit"] = s[1] + " " + s[2] + " " + d.toLocaleTimeString();
}

function execute(command) {
  var params = command.split("\ ");
  var cmd = params[0];
  var options = params.slice(1, params.length);
  var result = window[cmd];

  if (result === undefined) {
   result = '<p class="text">-bash: '+cmd+': command not found</p>'
  } else {
    result = result();
  }      

  return '<pre class="text">'+String(result)+'</pre>';
}

function moo() {
  return "<p class='text'> _____________________________________ <br />"+
         "( Welcome to <a href='/'>dillonhafer.com</a>. Feel    )<br />"+
         "( free to have a look around!         )<br />"+
         "(                       -Dillon       )<br />"+
         " ------------------------------------- <br />"+
         "       o   ,__,<br />"+
         "        o  (oo)____<br />"+
         "           (__)    )\\ <br />"+
         "              ||--|| *<br /></p>";
}

function clear() {
  $('.command-prompt').remove()
  $('.command-results').remove()
  $('body').append(createCommand());
  $('.command-prompt').first().remove();
  $('.command-prompt').slideDown('fast');
  $('input').last().focus();
  return "";
}

function createCommand() {
  return "<div class='row command-prompt hide'><div class='twelve columns'>user@dillonhafer.com<span class='text'>:</span><span class='cyan-text'>~</span><span class='text'>$</span> <input id='command' type='text' name='command' /></div></div><div class='row'><div class='twelve columns command-results hide'></div></div>";
}

function exit() {
  window.close();
}

function ls() {
  return "<p class='text'>"+
        "<a href='/books' class='blue-text'>Reading List</a><br />"+
        "<a href='/about' class='blue-text'>About me</a><br />"+
        "<a href='/contact' class='blue-text'>Contact me</a><br />"+
        "<a href='http://blog.dillonhafer.com' class='blue-text'>Blog</a></p>";
}

function whoami() {
  return "<p class='text'>user</p>";
}

function fooBar() {
  return "<p class='text'>foo was called</p>";
}

function date() {
  var d = new Date();
  return d.toGMTString();
}

function who() {      
  return "user   console  "+ localStorage["first-visit"];
}