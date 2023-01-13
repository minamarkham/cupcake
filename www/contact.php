<?php

if(!$_POST) exit;

// Email address verification, do not edit.
function isEmail($email) {
	return(preg_match("/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i",$email));
}

if (!defined("PHP_EOL")) define("PHP_EOL", "\r\n");

$name     = $_POST['name'];
$email    = $_POST['email'];
//$phone   = $_POST['phone'];
$subject  = $_POST['subject'];
$comments = $_POST['comments'];
$verify   = $_POST['verify'];

if(trim($name) == '') {
	echo '<div class="error_message">Attention! You must enter your name.</div>';
	exit();
} else if(trim($email) == '') {
	echo '<div class="error_message">Attention! Please enter a valid email address.</div>';
	exit();
// } else if(trim($phone) == '') {
// 	echo '<div class="error_message">Attention! Please enter a valid phone number.</div>';
// 	exit();
// } else if(!is_numeric($phone)) {
// 	echo '<div class="error_message">Attention! Phone number can only contain digits.</div>';
// 	exit();
} else if(!isEmail($email)) {
	echo '<div class="error_message">Attention! You have enter an invalid e-mail address, try again.</div>';
	exit();
}

if(trim($subject) == '') {
	echo '<div class="error_message">Attention! Please enter a subject.</div>';
	exit();
} else if(trim($comments) == '') {
	echo '<div class="error_message">Attention! Please enter your message.</div>';
	exit();
} else if(!isset($verify) || trim($verify) == '') {
	echo '<div class="error_message">Attention! Please enter the verification number.</div>';
	exit();
} else if(trim($verify) != '4') {
	echo '<div class="error_message">Attention! The verification number you entered is incorrect.</div>';
	exit();
}

if(get_magic_quotes_gpc()) {
	$comments = stripslashes($comments);
}


// Configuration option.
// Enter the email address that you want to emails to be sent to.
// Example $address = "joe.doe@yourdomain.com";

$address = "mina@mina.codes";


// Configuration option.
// i.e. The standard subject will appear as, "You've been contacted by John Doe."

// Example, $e_subject = '$name . ' has contacted you via Your Website.';

$e_subject = 'Mina.is/Here [Contact Form] | ' . $subject;


// Configuration option.
// You can change this if you feel that you need to.
// Developers, you may wish to add more fields to the form, in which case you must be sure to add them here.

$e_body = "You have been contacted by $name with regards to $subject, their additional message is as follows." . PHP_EOL . PHP_EOL;
$e_content = "\"$comments\"" . PHP_EOL . PHP_EOL;
$e_reply = "You can contact $name via email, $email.";

// create email content

$msg = wordwrap( $e_body . $e_content . $e_reply, 70 );

// $msg = "<html><body bgcolor='#ff6699'>";
// $msg .= "<table style='margin-top: 30px;width: 100%;'>";
// $msg .= "<tr>";
// $msg .= "<td></td>";
// $msg .= "<td bgcolor='#FFFFFF' height='500' style='display: block;max-width: 600px;margin: 0 auto;clear: both;'>";
// $msg .= "<div style='text-align: center;padding: 15px;max-width: 600px;margin: 0 auto;display: block;'>";
// $msg .= "<table style='width: 100%;'>";
// $msg .= "<tr><img src='http://mina.is/email/circleLogo.png' width='80' style='max-width: 100%;'></tr>";
// $msg .= "<tr>";
// $msg .= "<td>";
// $msg .= "<h3 style='font-family: &quot;HelveticaNeue-Light&quot;, &quot;Helvetica Neue Light&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Lucida Grande&quot;, sans-serif;line-height: 1.1;margin-bottom: 15px;color: #000;font-weight: 500;font-size: 27px;'>Hi, Mina,</h3>";
// $msg .= "<p style='font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;margin-bottom: 10px;font-weight: normal;font-size: 17px;line-height: 1.6;'>I&apos;m <strong>$name</strong> and I <strong>$subject</strong> You can contact me at <strong>$email</strong>.</p><br>";
// $msg .= "<p style='font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif;margin-bottom: 10px;font-weight: normal;font-size: 17px;line-height: 1.6;'>I was thinking&hellip; $comments</p>";
// $msg .= "</td>";
// $msg .= "</tr>";
// $msg .= "</table>";
// $msg .= "</div>";
// $msg .= "</td>";
// $msg .= "<td></td>";
// $msg .= "</tr>";
// $msg .= "</table>";
// $msg .= "</body></html>";

$headers = "From: $email" . PHP_EOL;
$headers .= "Reply-To: $email" . PHP_EOL;
$headers .= "MIME-Version: 1.0" . PHP_EOL;
$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

if(mail($address, $e_subject, $msg, $headers)) {

	// Email has sent successfully, echo a success page.

	echo "<div id='success_page'>";
	echo "<h3>Email Sent Successfully.</h3>";
	echo "<p>Thank you <strong>$name</strong>, your message has been submitted to us.</p>";
	echo "</div>";

} else {

	echo 'ERROR!';

}