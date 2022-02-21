var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var jogador;
var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/sky1.png");
  this.load.image("ground", "assets/platform.png");
  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 45,
    frameHeight: 38,
  });
}

function create() {
  //  A simple background for our game
  this.add.image(400, 300, "sky");

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  //  Now let's create some ledges
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  // The player and its settings
  player = this.physics.add.sprite(100, 450, "dude");

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 8, end: 9 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", start: 1, end: 1 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 18, end: 19 }),
    frameRate: 10,
    repeat: 1,
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  bombs = this.physics.add.group();

  //  The score
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000",
  });

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  this.physics.add.overlap(player, stars, collectStar, null, this);

  this.physics.add.collider(player, bombs, hitBomb, null, this);

  this.socket = io();
  var self = this;

  this.socket.on("jogadores", function (jogadores) {
    if (jogadores.primeiro === self.socket.id) {
      // Define jogador como o primeiro
      jogador = 1;

      // Personagens colidem com os limites da cena
      player1.setCollideWorldBounds(true);

      // Detecção de colisão: terreno
      physics.add.collider(player1, terreno, hitCave, null, this);

      // Detecção de colisão e disparo de evento: ARCas
      physics.add.collider(player1, ARCas, hitARCa, null, this);

      // Câmera seguindo o personagem 1
      cameras.main.startFollow(player1);

      // D-pad: para cada direção já os eventos
      // para tocar a tela ("pointerover")
      // e ao terminar essa interação ("pointerout")
      esquerda.on("pointerover", () => {
        if (timer > 0) {
          esquerda.setFrame(1);
          player1.setVelocityX(-160);
          player1.anims.play("left1", true);
        }
      });
      esquerda.on("pointerout", () => {
        if (timer > 0) {
          esquerda.setFrame(0);
          player1.setVelocityX(0);
          player1.anims.play("stopped1", true);
        }
      });
      direita.on("pointerover", () => {
        if (timer > 0) {
          direita.setFrame(1);
          player1.setVelocityX(160);
          player1.anims.play("right1", true);
        }
      });
      direita.on("pointerout", () => {
        if (timer > 0) {
          direita.setFrame(0);
          player1.setVelocityX(0);
          player1.anims.play("stopped1", true);
        }
      });
      cima.on("pointerover", () => {
        if (timer > 0) {
          cima.setFrame(1);
          player1.setVelocityY(-160);
          player1.anims.play("right1", true);
        }
      });
      cima.on("pointerout", () => {
        if (timer > 0) {
          cima.setFrame(0);
          player1.setVelocityY(0);
          player1.anims.play("stopped1", true);
        }
      });
      baixo.on("pointerover", () => {
        if (timer > 0) {
          baixo.setFrame(1);
          player1.setVelocityY(160);
          player1.anims.play("right1", true);
        }
      });
      baixo.on("pointerout", () => {
        if (timer > 0) {
          baixo.setFrame(0);
          player1.setVelocityY(0);
          player1.anims.play("stopped1", true);
        }
      });

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
        })
        .catch((error) => console.log(error));
    } else if (jogadores.segundo === self.socket.id) {
      // Define jogador como o segundo
      jogador = 2;

      // Personagens colidem com os limites da cena
      player2.setCollideWorldBounds(true);

      // Detecção de colisão: terreno
      physics.add.collider(player2, terreno, hitCave, null, this);

      // Detecção de colisão e disparo de evento: ARCas
      physics.add.collider(player2, ARCas, hitARCa, null, this);

      // Câmera seguindo o personagem 2
      cameras.main.startFollow(player2);

      // D-pad: para cada direção já os eventos
      // para tocar a tela ("pointerover")
      // e ao terminar essa interação ("pointerout")
      esquerda.on("pointerover", () => {
        if (timer > 0) {
          esquerda.setFrame(1);
          player2.setVelocityX(-160);
          player2.anims.play("left2", true);
        }
      });
      esquerda.on("pointerout", () => {
        if (timer > 0) {
          esquerda.setFrame(0);
          player2.setVelocityX(0);
          player2.anims.play("stopped2", true);
        }
      });
      direita.on("pointerover", () => {
        if (timer > 0) {
          direita.setFrame(1);
          player2.setVelocityX(160);
          player2.anims.play("right2", true);
        }
      });
      direita.on("pointerout", () => {
        if (timer > 0) {
          direita.setFrame(0);
          player2.setVelocityX(0);
          player2.anims.play("stopped2", true);
        }
      });
      cima.on("pointerover", () => {
        if (timer > 0) {
          cima.setFrame(1);
          player2.setVelocityY(-160);
          player2.anims.play("right2", true);
        }
      });
      cima.on("pointerout", () => {
        if (timer > 0) {
          cima.setFrame(0);
          player2.setVelocityY(0);
          player2.anims.play("stopped2", true);
        }
      });
      baixo.on("pointerover", () => {
        if (timer > 0) {
          baixo.setFrame(1);
          player2.setVelocityY(160);
          player2.anims.play("right2", true);
        }
      });
      baixo.on("pointerout", () => {
        if (timer > 0) {
          baixo.setFrame(0);
          player2.setVelocityY(0);
          player2.anims.play("stopped2", true);
        }
      });

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          midias = stream;
          localConnection = new RTCPeerConnection(ice_servers);
          midias
            .getTracks()
            .forEach((track) => localConnection.addTrack(track, midias));
          localConnection.onicecandidate = ({ candidate }) => {
            candidate &&
              socket.emit("candidate", jogadores.primeiro, candidate);
          };
          console.log(midias);
          localConnection.ontrack = ({ streams: [midias] }) => {
            audio.srcObject = midias;
          };
          localConnection
            .createOffer()
            .then((offer) => localConnection.setLocalDescription(offer))
            .then(() => {
              socket.emit(
                "offer",
                jogadores.primeiro,
                localConnection.localDescription
              );
            });
        })
        .catch((error) => console.log(error));
    }

    // Os dois jogadores estão conectados
    console.log(jogadores);
    if (jogadores.primeiro !== undefined && jogadores.segundo !== undefined) {
      // Contagem regressiva em segundos (1.000 milissegundos)
      timer = 60;
      timedEvent = time.addEvent({
        delay: 1000,
        callback: countdown,
        callbackScope: this,
        loop: true,
      });
    }
  });

  this.socket.on("offer", (socketId, description) => {
    remoteConnection = new RTCPeerConnection(ice_servers);
    midias
      .getTracks()
      .forEach((track) => remoteConnection.addTrack(track, midias));
    remoteConnection.onicecandidate = ({ candidate }) => {
      candidate && socket.emit("candidate", socketId, candidate);
    };
    remoteConnection.ontrack = ({ streams: [midias] }) => {
      audio.srcObject = midias;
    };
    remoteConnection
      .setRemoteDescription(description)
      .then(() => remoteConnection.createAnswer())
      .then((answer) => remoteConnection.setLocalDescription(answer))
      .then(() => {
        socket.emit("answer", socketId, remoteConnection.localDescription);
      });
  });

  this.socket.on("answer", (description) => {
    localConnection.setRemoteDescription(description);
  });

  this.socket.on("candidate", (candidate) => {
    const conn = localConnection || remoteConnection;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });

  // Desenhar o outro jogador
  this.socket.on("desenharOutroJogador", ({ frame, x, y }) => {
    if (jogador === 1) {
      player2.setFrame(frame);
      player2.x = x;
      player2.y = y;
    } else if (jogador === 2) {
      player1.setFrame(frame);
      player1.x = x;
      player1.y = y;
    }
  });
}

function update() {
  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

function collectStar(player, star) {
  star.disableBody(true, true);

  //  Add and update the score
  score += 10;
  scoreText.setText("Score: " + score);

  if (stars.countActive(true) === 0) {
    //  A new batch of stars to collect
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  gameOver = true;
}
