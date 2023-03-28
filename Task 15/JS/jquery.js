//function for dropdown menu
jQuery(function ($) {
  var $question = $(".question");
  var $answer = $(".answer");

  $question.click(function () {
    // Hide all answers
    $answer.slideUp();

    // Check if this answer is already open
    if ($(this).hasClass("open")) {
      // If already open, remove 'open' class and hide answer
      $(this).removeClass("open").next($answer).slideUp();
      // If it is not open...
    } else {
      // Remove 'open' class from all other questions
      $question.removeClass("open");
      // Open this answer and add 'open' class
      $(this).addClass("open").next($answer).slideDown();
    }
  });
});
