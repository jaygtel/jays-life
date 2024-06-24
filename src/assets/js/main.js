$(document).ready(function () {
  $('#contact-form').submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const formData = {
      name: $('#name').val(),
      email: $('#email').val(),
      subject: $('#subject').val(),
      message: $('#message').val()
    };

    $.ajax({
      type: 'POST',
      url: '/contact',
      data: formData,
      dataType: 'json',
      encode: true
    }).done(function (response) {
      $('#form-feedback').html(`<p>${response.message}</p>`).removeClass('error').addClass('success').show();

      // Set a timer to hide the feedback message after 15 seconds
      setTimeout(function () {
        $('#form-feedback').fadeOut();
      }, 15000);

      $('#contact-form')[0].reset(); // Reset the form
    }).fail(function (jqXHR, textStatus, errorThrown) {
      $('#form-feedback').html(`<p>Error: ${textStatus}</p>`).removeClass('success').addClass('error').show();

      // Set a timer to hide the feedback message after 15 seconds
      setTimeout(function () {
        $('#form-feedback').fadeOut();
      }, 15000);
    });
  });
});
