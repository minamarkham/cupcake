/* Author: Mina Markham */

/* Toggle List of Reasons: */

jQuery(document).ready(function() {
  jQuery(".content").hide();
  //toggle the componenet with class reasons
  jQuery(".reasons").click(function()
  {
    jQuery(this).next(".content").slideToggle(400);
  });
});