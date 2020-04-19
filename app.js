function sendEmail(e) {
  e.preventDefault();

  const POST_URL = 'https://script.google.com/macros/s/AKfycbyOdXmjKDMGNgOd9oSZ-sL9Sb8nN028MrA5Pw7ysYEUefuHqyk/exec';

  const postRequest = {
    name: e.target['name'].value,
    email: e.target['email'].value,
    subject: e.target['subject'].value,
    body: e.target['message'].value
  };

  if(POST_URL) {
    $.post(POST_URL, JSON.stringify(postRequest))
      .then(res => {

        e.target.reset();
        $('#alert-field')
          .removeClass()
          .addClass(`alert alert-${res.code}`)
          .text(res.msg);
      });

    $('#alert-field')
      .removeClass()
      .html('<progress></progress>')
      .removeClass('hidden');
  } else {
    alert('You must set the POST_URL variable with your script ID');
  }

}
