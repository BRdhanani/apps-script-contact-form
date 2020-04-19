function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  
  var response = sendMail({
    name   : json.name,
    email  : json.email,
    subject: json.subject,
    body   : json.body
  });
  
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

function sendMail(data) {
  try {
    var html = HtmlService.createTemplateFromFile('email');
    html.name = data.name;
    html.email = data.email;
    html.subject = data.subject;
    html.body = data.body;
    
    GmailApp.sendEmail('recipient-email', data.subject, '', {
                       name: 'Contact Form',
                       replyTo: data.email,
                       htmlBody: html.evaluate().getContent()
                       });
  
  return {
    success: true,
    msg: 'Thanks! We will contact you shortly'
  };
  }
  catch(err) {
    return {
      success: false,
      msg: 'Something went wrong'
    };
  }
}
