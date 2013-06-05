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

  if (command == '') {
    result = "";
  } else if (result === undefined) {
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


function GetUptimeStats(){
  var dateFuture = new Date(2013,4,30,11,16,59);
  var dateNow = new Date();
  var amount = dateFuture.getTime() - dateNow.getTime();                

  var days=0; var hours=0;var mins=0;var secs=0;var out="";

  amount = Math.floor(amount/1000);//kill the "milliseconds" so just secs

  days=Math.floor(amount/86400);//days
  amount=amount%86400;

  hours=Math.floor(amount/3600);//hours
  amount=amount%3600;

  mins=Math.floor(amount/60);//minutes
  amount=amount%60;

  secs=Math.floor(amount);//seconds

  if(days != 0){out += Math.abs(days) +" day"+((days!=1)?"s":"")+", ";}
  if(days != 0 || hours != 0){out += Math.abs(hours) +" hour"+((hours!=1)?"s":"")+", ";}
  if(days != 0 || hours != 0 || mins != 0){out += Math.abs(mins) +" min"+((mins!=1)?"s":"")+", ";}  
  return out;
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

function w() {
  var login_data = localStorage['first-visit'].split(' ');
  var user_month = login_data[0];
  var user_day = login_data[1];
  var user_year = new Date().getFullYear().toString().slice(2,4);  
  var login_time = user_day+user_month+user_year;

  var uptime_line = uptime();
  var line = "<br />USER    TTY          FROM     LOGIN@     IDLE    WHAT";
  var info = "<br />dhafer  s000         -       28Mar13     19days  /home/dhafer/.rvm/gems/ruby-1.9.3-p385";
     info += "<br />user    console      -       "+login_time+"     1:49    /usr/bin/bash";
  return uptime_line + line + info;
}

function date() {
  var d = new Date();
  return d.toGMTString();
}

function who() {      
  return "user   console  "+ localStorage["first-visit"];
}

function uptime() {
  var boot_time = new Date(2013, 3, 5, 3, 26, 11);
  var now = new Date();

  results = String(now.getHours()) + ":" + String(now.getMinutes()) + " up " + GetUptimeStats() + "1 user, load averages: " + (Math.random()*1).toPrecision(2) + " " + (Math.random()*1).toPrecision(2) + " " + (Math.random()*1).toPrecision(2);
  return results;//now - boot_time;
}