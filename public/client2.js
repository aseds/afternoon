var socket = io();
$('form').on('submit', function (event) {
	event.preventDefault();
	socket.emit('new todo', $('#item').val());
	$('#item').val('');
	return false;

	console.log('form... submited!!!');
});
socket.on('new todo', function(todoItem) {
	$('#items').append('<li>'+todoItem+'<span>X</span></ul>');
	// $('#items').append($('<li>').text(todoItem));
	console.log(todoItem);

});

$('ul')
	.on('mouseenter', 'li', function() {
		$(this).find('> span').toggleClass('special');

		$(this).find('> span')
			.on('click', function() {
				$(this).css('background', 'green');
				// remove this.parent
				var liElToRM = $(this).closest('li');
				var todoToRM = $(this).closest('li').text();

				// remove the 'X', is there a way around this?
				todoToRM = todoToRM.substring(0, todoToRM.length - 1);
				
				socket.emit('rm todo', todoToRM);
				socket.on('rm todo', function(todoToRemove){
					liElToRM.remove();
				});
			});
	})
	.on('mouseleave', 'li', function() {
		 $(this).find('span').toggleClass('special');
	});

/*
$('li').hover(
	function() {
		console.log('entered li');
//		$(this).toggleClass('special');
	},
	function() {
		console.log('exited li');
//		$(this).toggleClass('special');
	}
);
*/

/*

function() {
	console.log('clicked!');
	$(this).toggleClass('myh');
});


$('li').on('click', function() {
	$(this).css('background', 'blue');
});

$('li')
	.on('mouseenter', function() {
		$(this).addClass('special');
	})
	.on('mouseleave', function() {
		$(this).removeClass('special');	
	});

$('form').on('mouseenter', function() {
	$('form').css('background', 'blue');
}).on('mouseleave', function() {
	$('form').css('background', 'tomato');
});
*/
