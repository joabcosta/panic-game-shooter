const player = document.querySelector('.player-shooter');
const playArea = document.querySelector('.main-play-area');
const aliensImg = [
    'images/virus-1.png', 'images/virus-2.png','images/virus-3.png',
    'images/virus-4.png', 'images/virus-5.png','images/virus-6.png','images/virus-7.png'
];
const instructions = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
    //--------------sons do jogo---------------
    var musica=document.getElementById("musica");
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();
    //------------------------------------------
let alienInterval;

//Inicio função para detectar teclas do usuário e movimentar player
function detectarTeclas(event){
    if(event.key ==='ArrowUp'){
        event.preventDefault();
        moveUp();
    }else if(event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    }else if (event.key === " "){
        event.preventDefault();
        fireKnife();
        knife.play();
    }
}
    //função para mover para cima
    function moveUp(){
        let topPosition = getComputedStyle(player).getPropertyValue('top');
        if(topPosition <= "0px"){
            return;
        }else{
            let position = parseInt(topPosition);
            position -=20;
            player.style.top = `${position}px`;
        }
    }
    //--.. fim function moveUp ..--//
    //função para mover para baixo
    function moveDown(){
        let topPosition = getComputedStyle(player).getPropertyValue('top');
        if(topPosition === "490px" ){
            //console.log('a' + topPosition);
            return;
        }else{
            //console.log('else' + topPosition)
            let position = parseInt(topPosition);
            position +=20;
            player.style.top = `${position}px`;
        }
    }
    //--.. fim function moveDown ..--//
    
    
//--... fim da função para detectar teclas e movimentar player...--//

//Inicio função de criar disparo de faca 
function fireKnife(){
    let knife = createNifeElement();
    playArea.appendChild(knife);
    moveKnife(knife);
}
     //função para criar knife
    function createNifeElement(){
        let xPosition = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
        let yPosition = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
        let newKnife = document.createElement('img');
        newKnife.src = 'images/knife.png';
        newKnife.classList.add('knife');
        newKnife.style.left=`${xPosition - 50}px`;
        newKnife.style.top=`${yPosition - 40}px`;
        return newKnife;
    }
    //--.. fim da função de criar knife ..--//
    //função para mover knife e verificar colisao
    function moveKnife(knife){
        let knifeInterval = setInterval(()=>{
            let xInitialPosition = parseInt(knife.style.left);
            let aliens = document.querySelectorAll('.alien');
                        //sub: verifica colisão
                        aliens.forEach((alien)=>{
                            if(checkCollision(knife,alien)){
                                alien.src='images/explosion.png';
                                alien.classList.add('dead-alien');
                                setTimeout(()=>{
                                    alien.remove();
                                },531);
                            }
                        });
                        //-----..... end sub ..... -----//
            if(xInitialPosition >= 617){
                knife.remove();
                console.log(xInitialPosition);
                clearInterval(knifeInterval);
            } else{
                knife.style.left = `${xInitialPosition + 5}px`;
                console.log(xInitialPosition);
            }
        }, 10);
    }
    //--.. fim da função de mover knife ..--//
//--... fim da função para atirar objetos ...--//

//Inicio função de criar aliens
function createAliens(){
    let newAlien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random()*aliensImg.length)]
    newAlien.src = alienSprite;
    newAlien.classList.add('alien');
    newAlien.classList.add('alien-transition');
    newAlien.style.left = '567px';
    newAlien.style.top = `${Math.floor(Math.random()*450)+30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}
    //função para mover o alien
    function moveAlien(alien){
        let moveAlienInterval = setInterval(()=>{
            let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));
            if(xPosition<=40){
                    if(Array.from(alien.classList).includes('dead-alien')){
                        alien.remove();
                        clearInterval(moveAlienInterval);
                    } else{
                        gameOver();
                            }
            } else{
                alien.style.left=`${xPosition - 4}px`;
            }
        },30);
    }
    //--.. fim da função de mover alien ..--//
//--... fim da função de criar aliens  ...--//

//função para detectar colisão
function checkCollision(knife,alien){
    let knifeTop = parseInt(knife.style.top);
    let knifeLeft = parseInt(knife.style.left);
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 40;
    /*console.log('checkCollision nifeTop '+knifeTop);
    console.log('checkCollision nifeLeft '+knifeLeft);
    console.log('checkCollision alienTop '+alienTop);
    console.log('checkCollision alienLeft '+alienLeft);
    console.log('checkCollision e '+alienBottom);
    console.log('checkCollision alienLeft '+alienLeft);
    */
    
    if((alienLeft >= 40) && ((knifeLeft+40) >= alienLeft) ){
            if(knifeTop <= alienTop && knifeTop >= alienBottom){
                return true;
            } else{
                return false;
            }
    } else{
        return false;
    }
}
//--... fim da função de detectar colisão  ...--//

//Inicio da função start game e game over
startButton.addEventListener('click', (event)=>{
    playGame();
});
function playGame(){
    instructions.style.display='none';
    window.addEventListener('keydown', detectarTeclas);
    alienInterval = setInterval(()=>{
        createAliens();
    },2000);
}
function gameOver(){
    gameOverSound.play();
    window.removeEventListener('keydown', detectarTeclas);
    clearInterval(alienInterval);
    let aliens = document.querySelectorAll('.alien');
    aliens.forEach((alien)=>alien.remove()); 
    let knifes = document.querySelectorAll('.knife');
    knifes.forEach((knife)=>knife.remove());
    setTimeout(()=>{
        alert('Game Over');
        player.style.top = "250px";
        instructions.style.display= "block";
    });
}
//--... fim da função start game e game over  ...--//