<?php
if ($_GET['randomId'] != "PC7iTbDKyJUOFJ3WV1HwclhMgkXaLQsrF0amC1_H9LLkQqgpZSxb8S8rd3fleaJ7") {
    echo "Access Denied";
    exit();
}

// display the HTML code:
echo stripslashes($_POST['wproPreviewHTML']);

?>  
