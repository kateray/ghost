$( document ).ready(function() {
	window.setInterval(function(){
		$('#sentence').addClass('glitch2');
		$.ajax({
			url: '/n',
			success: function(resp){
				var text = '$ ' + resp;
				window.setTimeout(function(){
					$('#sentence').attr('data-text', text).text(text);
					$('#sentence').removeClass('glitch2');
				}, 1000);
			}
		});
	}, 4500 );
	/*window.addEventListener('keydown', function(e){
		location.reload();
	});*/
} );
