new p5();

let scene1 = true;
let scene2 = false;
let scene3 = false;

let character;
let gravity = 1.784;
let jump = 8.789;

let enemy;
let enemies;
let e;
let speed = 7;

let spikes;
let s;

let score = 0;

let shiptextX = 570;
let bouncetextX = 620;

enemies = new Group();
spikes = new Group();

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	character = createSprite(100, 100);
	character.addImage(loadImage('images/ship.png'))
	character.scale = 0.045;
	character.setCollider('circle', 0, 0, 420)

	playbutton = createSprite(width/2 + 2, height - 12.5);
	playbutton.addImage(loadImage('images/playbutton.png'))
	playbutton.scale = 0.1

	restartbutton = createSprite(width/2 + 2, height - 220);
	restartbutton.addImage(loadImage('images/restartbutton.png'))
	restartbutton.scale = 0.35

	homebutton = createSprite(width/2 + 2, height - 162.5);
	homebutton.addImage(loadImage('images/homebutton.png'))
	homebutton.scale = 0.39
}

function draw() {
	background(225);

	camera.zoom = 0.5

	Camera(character.position.x, character.position.y, 105)

	if(scene1 == true) {
		textSize(67);
		textFont('Anton');
		textAlign(CENTER);
		fill(0);
		text('SHIP', width/2 - shiptextX, height/2 - 80)
		text('BOUNCE', width/2 + bouncetextX, height/2 - -20)
		shiptextX -= 15;
		bouncetextX -= 15;
		if(shiptextX <= -15) {
		 shiptextX += 15;
	}
		if(bouncetextX <= 0) {
		 bouncetextX += 15
	 }

	 playbutton.onMousePressed = function() {
		 scene2 = true;
		 scene1 = false;
	 }

	playbutton.velocity.y -= 0.5;

	if(playbutton.position.y <= height / 2 + 95) {
		playbutton.position.y = height / 2 + 95;
	}

	playbutton.visible = true;
	restartbutton.visible = false;
	homebutton.visible = false;
 	drawSprite(playbutton)
}


	else if(scene2 == true) {

			character.velocity.y += gravity;


			if(character.position.y <= 30) {
				character.position.y = 30
			}
			if(character.position.y >= height - 30) {
				character.position.y = height - 30
			}

			if(mouseIsPressed) {
				character.rotation = -9;
				character.velocity.y = -jump;
			}
			else{
				character.rotation = 7;
			}

			if(frameCount % 60 == 0) {
				enemy = createSprite(random(width + 25, width + 20000), random(55, height - 55));
				enemy.addImage(loadImage('images/enemy.png'))
				speed += 0.171;
				enemy.velocity.x -= speed;
				enemy.setCollider('circle', 0, 0, 155)
				enemies.add(enemy)

				enemy = createSprite(random(width + 25, width + 20000), random(55, height - 55));
				enemy.addImage(loadImage('images/enemy.png'))
				speed += 0.171;
				enemy.velocity.x -= speed;
				enemy.setCollider('circle', 0, 0, 155)
				enemies.add(enemy)

				enemy = createSprite(random(width + 25, width + 20000), random(55, height - 55));
				enemy.addImage(loadImage('images/enemy.png'))
				speed += 0.171;
				enemy.velocity.x -= speed;
				enemy.setCollider('circle', 0, 0, 155)
				enemies.add(enemy)
			}

				if(frameCount % 7 == 0) {
					spike = createSprite(width + 25, 20.8);
					spike.addImage(loadImage('images/enemy top and bottom.png'))
					spike.setCollider('circle', 0, 0, 25)
					spike.rotation = 180
					spike.velocity.x -= 7;
					spikes.add(spike)

					spike = createSprite(width + 25, height - 20.8);
					spike.addImage(loadImage('images/enemy top and bottom.png'))
					spike.setCollider('circle', 0, 0, 25)
					spike.velocity.x -= 7;
					spikes.add(spike)
			}

			for(let i = 0; i < enemies.length; i++) {
				e = enemies[i];
				e.scale = 0.2;
				e.rotation += 5;

				if(character.overlap(e)) {
					scene3 = true;
					scene2 = false;
				}

				if(e.position.x <= -20) {
					e.remove();
				}
			}

			for(let j = 0; j < spikes.length; j++) {
				s = spikes[j]
				s.scale = 0.035

				if(character.overlap(s)) {
					scene3 = true;
					scene2 = false;
				}

				if(s.position.x <= -20) {
					s.remove();
				}
			}

			Score();

			drawSprite(character);
			drawSprites(enemies);
			drawSprites(spikes);
			playbutton.visible = false;
			restartbutton.visible = false;
			homebutton.visible = false;
	}


	else if(scene3 == true) {
		textSize(68);
		textFont('Anton');
		textAlign(CENTER);
		fill(0);
		text('GAME OVER', width / 2, height / 2 - 76);

		textSize(23);
		textFont('Anton');
		textAlign(CENTER);
		fill(0);
		text('YOUR SCORE: ' + score, width / 2, height / 2 - 29);
		restartbutton.onMousePressed = function() {
			newGame();
			scene3 = false;
			scene2 = true;
		}

		homebutton.onMousePressed = function() {
			document.location.reload();
}

		restartbutton.visible = true;
		homebutton.visible = true;

		restartbutton.removed = false;
		homebutton.removed = false;

		drawSprite(restartbutton);
		drawSprite(homebutton);
  }
}

function Score() {
	textSize(20);
	textFont('Anton');
	fill(0);
	score += 1;
	text(score, width - 75, 75);
}


function newGame() {
	enemies.removeSprites();
	spikes.removeSprites();
	score = 0;
	restartbutton.removed = true;
	homebutton.removed = true;
}
