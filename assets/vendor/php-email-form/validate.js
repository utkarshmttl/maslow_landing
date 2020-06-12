jQuery(document).ready(function($) {

  function post_request(url, payload){
    return new Promise(function(resolve, reject){
      $.ajax({
        url: url,
        type: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        data: payload,
        success: function(data) {
          console.log(data);
          resolve(data) // Resolve promise and go to then()
        },
        error: function(err) {
          reject(err) // Reject the promise and go to catch()
        }
      })
    })
  }

  "use strict";

  //Contact
  $('form.php-email-form').submit(function() {
   
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

    if (ferror) return false;
    else var str = $(this).serialize();

    var this_form = $(this);
    var action = $(this).attr('action');

    if( ! action ) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }
    
    this_form.find('.sent-message').slideUp();
    this_form.find('.error-message').slideUp();
    this_form.find('.loading').slideDown();

    var name = this_form[0][0].value;
    var telephone = this_form[0][2].value;
    var email = this_form[0][1].value;
    var message = this_form[0][3].value;

    var data = {name: name, telephone: telephone, email: email, message: message};


    post_request("https://lithics.in/apis/mauka/evidya_mail.php", data).then(function (response) {

      this_form.find('.loading').slideUp();
      this_form.find('.sent-message').slideDown();
      this_form.find("input:not(input[type=submit]), textarea").val('');
    }).catch(function (err) {
      this_form.find('.loading').slideUp();
      this_form.find('.error-message').slideDown().html("Unable to send email");
    });

    return false;
  });

  $('form.subscribe-form').submit(function() {

    var this_form = $(this);

    var email = this_form[0][0].value;

    var data = {email: email};

    post_request("https://lithics.in/apis/mauka/evidya_mail.php", data).then(function (response) {
      console.log(response);
    }).catch(function (err) {
      console.log(err);
    });

    return false;
  });

});
