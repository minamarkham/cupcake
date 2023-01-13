jQuery(document).ready(function(){
	
	$('#contactform').submit(function(){
	
		var action = $(this).attr('action');
		
		$("#message").slideUp(750,function() {
		$('#message').hide();
		
 		$('#submit')
			.after('<img src="images/ajax-loader.gif" class="loader" />')
			.attr('disabled','disabled');
		
		$.post(action, { 
			name: $('#name').val(),
			phone: $('#phone').val(),
			email: $('#email').val(),
			comments: $('#comments').val(),
		},
			function(data){
				document.getElementById('message').innerHTML = data;
				$('#message').slideDown('slow');
				$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
				$('#contactform #submit').attr('disabled',''); 
				if(data.match('success') != null) $('#contactform').slideUp('slow');
				
			}
		);
		
		});
		
		return false; 
	
	});
	
});