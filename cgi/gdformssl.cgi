#!/usr/bin/perl

sub parse_form_data
{
    local (*FORM_DATA) = @_;
    local  ( $request_method, $query_string, @key_value_pairs, $key_value, $key, $value);
    $request_method = $ENV{'REQUEST_METHOD'};
    if ($request_method eq "GET") {
        $query_string = $ENV{'QUERY_STRING'};
    } elsif ($request_method eq "POST") {
        read (STDIN, $query_string, $ENV{'CONTENT_LENGTH'});
    };
    @key_value_pairs = split(/&/, $query_string);
    foreach $key_value (@key_value_pairs) {
        ($key, $value) = split (/=/, $key_value);
        if (defined($value)) {$value =~ tr/+/ /;
            $value =~ s/%([\dA-Fa-f][\dA-Fa-f])/pack ("C", hex ($1))/eg;};
        if (defined($FORM_DATA{$key})) {
            $FORM_DATA{$key} = join (" ", $FORM_DATA{$key}, $value);
        } else {
            $FORM_DATA{$key} = $value;
        }
    }
}; # end of sub

&parse_form_data(*simple_form);
$t = time;
chdir ($ENV{'DOCUMENT_ROOT'}) ; chdir("..");
open (OUTFILE, ">data/gdform_$t") or die ("Cannot open file");
while (($key , $value) = each(%simple_form)) {

  print OUTFILE "<GDFORM_VARIABLE NAME=$key START>\n";
  print OUTFILE "$value\n";
  print OUTFILE "<GDFORM_VARIABLE NAME=$key END>\n";
  if ($key eq "redirect") { $landing_page = $value;}

}
close (OUTFILE);
if ($landing_page ne "") {
  print "Location: https://$ENV{'HTTP_HOST'}/$landing_page\n\n";
} else {
  print "Location: https://$ENV{'HTTP_HOST'}/\n\n";
}

