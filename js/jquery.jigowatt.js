jQuery(document).ready(function(){
	
	$('#message').hide();
	
	// Add validation parts
	$('#contact input[type=text], #contact input[type=number], #contact input[type=email], #contact input[type=url], #contact input[type=tel], #contact select, #contact textarea').each(function(){
		$(this).after('<mark class="validate"></mark>');
	});
	
	// Validate as you type
	$('#name, #comments').focusout(function() {
		if (!$(this).val()) 
			$(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
		else 
			$(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
	});
	$('#email').focusout(function() {
		if (!$(this).val() || !isEmail($(this).val())) 
			$(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
		else 
			$(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
	});
	$('#website').focusout(function() {
		var web = $(this).val();
		if (web && web.indexOf("://") == -1) {
			//$(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
			$(this).val('http://' + web);
			$(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');			
		} else if (web)
			$(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
		else 
			$(this).removeClass('error').parent().find('mark').removeClass('error').removeClass('valid');
	});
	$('#verify').focusout(function() {
		var verify = $(this).val();
		var verify_box = $(this);
		if (!verify) 
			$(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
		else {
		
			// Test verification code via ajax
			$.ajax({
				type: 'POST',
				url: 'verify/ajax_check.php',
				data: { verify: verify },
				async: false,
				success: function( data ) {
					if (data=='success') {
						$(verify_box).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
					} else {
						$(verify_box).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
					}
				}
			});
		
		}			
	});
	
	$('#submit').click(function() {
		$("#message").slideUp(200,function() {
			$('#message').hide();
		
			// Kick in Validation
			$('#name, #phone, #comments, #website, #verify, #email').triggerHandler("focusout");
			
			if ($('#contact mark.error').size()>0) {
				$('#contact').effect('shake', { times:2 }, 75, function(){
					$('#contact input.error:first, #contact textarea.error:first').focus();
				});				
				return false;
			}
			
		});
	});
	
	$('#contactform').submit(function(){
		
		if ($('#contact mark.error').size()>0) {
			$('#contact').effect('shake', { times:2 }, 75);
			return false;
		}
		
		var action = $(this).attr('action');
		
 		$('#submit')
			.after('<img src="assets/ajax-loader.gif" class="loader" />')
			.attr('disabled','disabled');
		
		$.post(action, { 
			name: $('#name').val(),
			email: $('#email').val(),
			phone: $('#phone').val(),
			website: $('#website').val(),
			subject: $('#subject').val(),
			comments: $('#comments').val(),
			verify: $('#verify').val()
		},
			function(data){
				$('#message').html( data );
				$('#message').slideDown();
				$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
				$('#contactform #submit').attr('disabled',''); 
				if(data.match('success') != null) $('#contactform').slideUp('slow');
				
			}
		);
		
		return false; 
	
	});
	
	function isEmail(emailAddress) {

		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		
		return pattern.test(emailAddress);
	}
	
	function isNumeric(input) {
    	return (input - 0) == input && input.length > 0;
	}
	
});