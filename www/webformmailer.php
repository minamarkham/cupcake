<?php

if ( !isset($_SERVER['SPI'])) {
        die();
}

if (!isset($_SERVER['DOCUMENT_ROOT'])) {
	echo("CRITICAL: we seem to be running outside of the norm.\n");
	header("Location: http://".$_SERVER["HTTP_HOST"]."/");
	die("CRITICAL: Document root unavailable.\n");
}

$request_method = $_SERVER["REQUEST_METHOD"];
if($request_method == "GET") {
	$query_vars = $_GET;
}
elseif ($request_method == "POST") {
	$query_vars = $_POST;
}

reset($query_vars);
function customsort($a,$b) {
	// $a is array for form vars, $b is comma seperated case sensitive field order
	// this is case sensitive -- good idea to hrc that.
        $data = array();
        if ( strstr($b,',') == FALSE )  {
                $b = $b.",";
        }
        $ordering = split(',',$b);
        foreach ($ordering as $orderitem) {
                if ( ($orderitem != null) && ($orderitem != "") ) {
                        if (isset($a[$orderitem])) {
                                $data[$orderitem] = $a[$orderitem];
                        }
                }
        }
        foreach ($a as $key=>$val) {
                $data[$key] = $a[$key];
        }
        return $data;
}

function xmlentities($string) {
	return str_replace ( array('&', '"', "'", '<', '>'), array('&amp;', '&quot;', '&apos;', '&lt;', '&gt;'), $string);
}

$t = date("U");

$formhomedir = preg_replace('/.*\/home\/content/','',$_SERVER['DOCUMENT_ROOT']);
$formhomedir = explode('/',$formhomedir);
if (count($formhomedir) <= 4) {
        $formhome="/home/content/".$formhomedir[1]."/".$formhomedir[2]."/data/";
}
else {
        $formhome="/home/content/".$formhomedir[1]."/".$formhomedir[2]."/".$formhomedir[3]."/".$formhomedir[4]."/data/";
}

$file_order = ".default";
$file_format = ".text";
$file_interval = ".15m";
$field_order = "";

if (isset($query_vars['form_order'])) {
	if ($query_vars['form_order'] != "alpha") {
		$field_order=$query_vars['form_order'];
		$file_order=".custom";
		$query_vars = customsort($query_vars,$field_order);
	}
	else {
		switch ($query_vars['form_order']) {
			case "alpha":
				uksort($query_vars,'strnatcasecmp');
				$file_order=".alpha";
			break;
			default:
				$file_order=".default";
			break;
		}
	}
}

if (isset($query_vars['form_format'])) {
	switch ($query_vars['form_format']) {
		case "csv":
			$file_format = ".csv";
		break;
		case "html":
			$file_format = ".html";
		break;
		case "xml":
			$file_format = ".xml";
		break;
		case "text":
		case "default":
		default:
			$file_format = ".text";
		break;
	}
}

if (isset($query_vars['form_delivery'])) {
	switch ($query_vars['form_delivery']) {
		case "hourly":
			$file_interval = ".60m";
		break;
		case "hourly_digest":
			$file_interval = ".60mc";
		break;
		case "daily":
			$file_interval = ".24h";
		break;
		case "daily_digest":
			$file_interval = ".24hc";
		break;
		case "digest":
			$file_interval = ".15mc";
		break;
		case "default":
		default:
			$file_interval = ".15m";
		break;
	}
}

$file = $formhome."form_".$t.$file_order.$file_format.$file_interval;
$fp = fopen($file,"w");

reset($query_vars);
switch ($file_format) {
	case ".csv":
		$csvkeys = "";
		$csvvals= "";
		$firsttime = "";
		while (list ($key, $val) = each ($query_vars)) {
			if ( ($key == "form_order") ||
				($key == "form_format") ||
				($key == "form_delivery") ||
				($key == "redirect") ) {
			}
			else {
				if ($csvkeys != "") {
					$firsttime=",";
				}
				$tmpkey=escapeshellcmd($key);
				$csvkeys = $csvkeys.$firsttime."'".$tmpkey."'";
				$tmpval=escapeshellcmd($val);
				$csvvals = $csvvals.$firsttime."'".$tmpval."'";
			}
		}
		fputs($fp,"$csvkeys\n");
		fputs($fp,"$csvvals\n");
	break;
	case ".html":
		fputs($fp,"<table border=\"1\" cellspacing=\"1\" cellpadding=\"2\">\n");
	break;
	case ".xml":
		fputs($fp,"<form>\n");
	break;
}
		
reset($query_vars);
while (list ($key, $val) = each ($query_vars)) {
	if ($key == "redirect") {
		$landing_page = $val;
	}
	if ( ($key == "form_order") ||
		($key == "form_format") ||
		($key == "form_delivery") ||
		($key == "redirect") ) {

	}
	else {
		switch ($file_format) {
			case ".html":
				fputs($fp,"\t<tr>\n");
				fputs($fp,"\t\t<td><b>$key</b></td>\n");
				fputs($fp,"\t\t<td>$val</td>\n");
				fputs($fp,"\t</tr>\n");
				
			break;
			case ".csv":
				// content is already output
			break;
			case ".xml":
				fputs($fp,"\t<field>\n");
				fputs($fp,"\t\t<fieldname>".xmlentities($key)."</fieldname>\n");
				fputs($fp,"\t\t<fieldvalue>".xmlentities($val)."</fieldvalue>\n");
				fputs($fp,"\t</field>\n");
			break;
			case ".text":
			default:
				fputs($fp,$key.": ".$val."\n");
			break;
		}
	}
}

switch ($file_format) {
	case ".html":
		fputs($fp,"</table>\n");
	break;
	case ".xml":
		fputs($fp,"</form>\n");
	break;
}


fclose($fp);

if ($landing_page != "") {
	header("Location: http://".$_SERVER["HTTP_HOST"]."/$landing_page");
}
else {
	header("Location: http://".$_SERVER["HTTP_HOST"]."/");
}


?>
