var blockSize = 30;
var total_row = 17; 
var total_col = 17; 
var board;
var context;
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var speedX = 0; 
var speedY = 0; 
var snakeBody = [];
var foodX;
var foodY;
var gameOver = false;
window.onload = function () 
{
	board = document.getElementById("board");
	board.width = total_col * blockSize;
	board.height = total_row * blockSize;
	
	context = board.getContext("2d");
	placeFood();
	document.addEventListener("keydown", changeDirection);
	setInterval(update, 1000 / 5);
}

function update() 
{
	if (gameOver) 
	{
		return;
	}
	context.fillStyle = "black";
	context.fillRect(0, 0, board.width, board.height);
	context.fillStyle = "white";
	context.fillRect(foodX, foodY, blockSize, blockSize);

	if (snakeX == foodX && snakeY == foodY) 
	{
		snakeBody.push([foodX, foodY]);
		placeFood();
	}
	for (let i = snakeBody.length - 1; i > 0; i--) 
	{
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) 
	{		
		snakeBody[0] = [snakeX, snakeY];
	}
	context.fillStyle = "red";
	snakeY += speedY * blockSize;
	snakeX += speedX * blockSize;  
	context.fillRect(snakeX, snakeY, blockSize, blockSize);
	for (let i = 0; i < snakeBody.length; i++) 
	{
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}
	if (snakeX < 0|| snakeX > total_col * blockSize|| snakeY < 0|| snakeY > total_row * blockSize) 
	{
		gameOver = true;
		alert("Game Over");
	}

	for (let i = 0; i < snakeBody.length; i++) 
	{
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) 
		{
			gameOver = true;
			alert("Game Over");
		}
	}
}
function changeDirection(e) 
{
	if (e.code == "ArrowDown" && speedY != -1) 
	{
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowUp" && speedY != 1) {
		speedX = 0;
		speedY = -1;
	}
	
	else if (e.code == "ArrowLeft" && speedX != 1) 
	{
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "ArrowRight" && speedX != -1) 
	{
		speedX = 1;
		speedY = 0;
	}
}
function placeFood() 
{
	foodY = Math.floor(Math.random() * total_row) * blockSize;
	foodX = Math.floor(Math.random() * total_col) * blockSize;
}
