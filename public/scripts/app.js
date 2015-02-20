$( document ).ready(function() {
	window.setInterval(function(){
		$.ajax({
			url: '/n',
			success: function(resp){
				var text = '$ ' + resp;
				$('#sentence').attr('data-text', text).text(text);
			}
		});
	}, 4000 );
	/*window.addEventListener('keydown', function(e){
		location.reload();
	});*/
} );
