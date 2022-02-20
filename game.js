$(document).ready(function() {
			
	_winHeight = $(window).height() - 100;
	
	$("#templateContainer").height(_winHeight);
	$("#templateContainer").width(_winHeight);
		
	$("#btnNewGame").bind("click", function( event ) {
		 location.reload();
	});
	
	$("#btnNextMove").bind("click", function( event ) {
		nextMove();
	});
	
	$( window ).resize(function() {
		//ToDo
	});

	drawBoard();
});

function getRandomArbitary (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

var _currentPos = 0;
var _winHeight = 0;
function nextMove() {
	var move = getRandomArbitary(1, 7);
	
	if((_currentPos + move) > 100)
	{
		return;
	}
	
	_currentPos = _currentPos + move;
	
    if(links[_currentPos] != undefined)
	{
		_currentPos = links[_currentPos];
	}
	
	var newPosition = rows[_currentPos - 1];
	
	$(".move").remove();
	var clonedCircle = $("#player").clone();
	
	var squareSize = _winHeight / 10;
	clonedCircle.attr("cx", parseInt(newPosition.split(',')[0]) + (squareSize/2));
	clonedCircle.attr("cy", parseInt(newPosition.split(',')[1]) + (squareSize/2));
	clonedCircle.attr("class", "move");	
	
	$(".move").show();
	clonedCircle.appendTo( "#templateContainer" );
	
	if(_currentPos == 100)
	{
		alert("Game Finished!");
	}
}

function drawLadders() {
		
	drawArrows(getRandomArbitary(5, 25), getRandomArbitary(33, 90), "snake");
	drawArrows(getRandomArbitary(22, 45), getRandomArbitary(51, 90), "snake");
		
	drawArrows(getRandomArbitary(30, 50), getRandomArbitary(5, 10), "ladder");
	drawArrows(getRandomArbitary(36, 78), getRandomArbitary(11, 25), "ladder");
	drawArrows(getRandomArbitary(44, 94), getRandomArbitary(18, 35), "ladder");
		
	$( ".origLine" ).remove();
	$( ".origCircle" ).remove();
}

function drawArrows(start, end, className) {
	
	var squareSize = _winHeight / 10;
	
	var startCordinates = rows[start].split(',');
	var x0 = parseInt(startCordinates[0]) + (squareSize/2);
	var y0 = parseInt(startCordinates[1]) + (squareSize/2);
	
	var endCordinates = rows[end].split(',');
	var x1 = parseInt(endCordinates[0]) + (squareSize/2);
	var y1 = parseInt(endCordinates[1]) + (squareSize/2);
	
	var clonedLine = $(".origLine").clone();	
	
	clonedLine.attr("x1", x0);
	clonedLine.attr("y1", y0);
	
	clonedLine.attr("x2", x1);
	clonedLine.attr("y2", y1);
	
	clonedLine.attr("class", className);	
	
	clonedLine.appendTo( "#templateContainer" );	
	
	var clonedCircle = $(".origCircle").clone();
	
	clonedCircle.attr("cx", x0);
	clonedCircle.attr("cy", y0);
	
	clonedCircle.attr("class", className + "Circle");	
	
	clonedCircle.appendTo( "#templateContainer" );	
	
	links[end + 1] = start + 1;
}

var numerOfRows = 10;
var numerOfcolumns = 10;
var rows = new Array(numerOfRows * numerOfcolumns);
var links = new Array(numerOfRows * numerOfcolumns);

function drawBoard() {		
		 
	var squareSize = _winHeight / 10;
	
	var columnNr = 1; var leftToRight = true;
	var x = 0; var y = 0; var position = 100;
    for (var row = 1; row <= numerOfRows; row++) 
    {	
		if (leftToRight) 
        {
            x = 0;
        }
        else 
        {
            x = $("#templateContainer").width() - squareSize;
        }
		
		for (var column = 1; column <= numerOfcolumns; column++) 
        {
			rows[position - 1] = x.toString() + "," + y.toString();
			
			var clonedRect = $(".orig").clone();	
			
			clonedRect.attr("x", x);
			clonedRect.attr("y", y);
			clonedRect.attr("width", squareSize);
			clonedRect.attr("height", squareSize);
			
			var rnd = Math.floor(Math.random() * 6) + 1;
			var className = "Rect Rect" + rnd.toString();
			
			clonedRect.attr("class", className);	
			clonedRect.appendTo( "#templateContainer" );

			var clonedText = $(".origText").clone();	

			clonedText.text(position.toString());
			clonedText.attr("x", x + 30);
			clonedText.attr("y", y + 30);
			clonedText.attr("class", "text");	
			clonedText.appendTo( "#templateContainer" );
			
			if (leftToRight) 
			{
				x += squareSize;
			}
			else
			{
				x -= squareSize;
			}	
					
			position--;
		}		
		
		y += squareSize;
		
		leftToRight = !leftToRight;
	}
	
	$( ".orig" ).remove();
	$( ".origText" ).remove();
	
	drawLadders();	
}
