(()=>{"use strict";var e={436:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Collision=void 0,t.Collision=class{isCollidingBrick(e,t){return e.pos.x<t.pos.x+t.width&&e.pos.x+e.width>t.pos.x&&e.pos.y<t.pos.y+t.height&&e.pos.y+e.height>t.pos.y}isCollidingBricks(e,t){let i=!1;return t.forEach(((s,n)=>{this.isCollidingBrick(e,s)&&(e.changeYDirection(),1===s.energy?t.splice(n,1):s.energy-=1,i=!0)})),i}checkBallCollision(e,t,i){e.pos.x+e.width>t.pos.x&&e.pos.x<t.pos.x+t.width&&e.pos.y+e.height===t.pos.y&&e.changeYDirection(),(e.pos.x>i.canvas.width-e.width||e.pos.x<0)&&e.changeXDirection(),e.pos.y<0&&e.changeYDirection()}}},301:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.clock=void 0;const i=document.querySelector(".hour"),s=document.querySelector(".minute"),n=document.querySelector(".second");function o(){const e=new Date,t=30*((e.getHours()+11)%12+1),o=6*e.getMinutes(),r=6*e.getSeconds();i.style.transform=`rotate(${t}deg)`,s.style.transform=`rotate(${o}deg)`,n.style.transform=`rotate(${r}deg)`}t.clock=o,setInterval(o,1e3)},382:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createBricks=void 0;const s=i(135),n=i(56);t.createBricks=function(e,t){return e[t].reduce(((e,t,i)=>{const o=Math.floor((i+1)/n.STAGE_COLS),r=i%n.STAGE_COLS,a=n.STAGE_PADDING+r*(n.BRICK_WIDTH+n.BRICK_PADDING),l=n.STAGE_PADDING+o*(n.BRICK_HEIGHT+n.BRICK_PADDING);return 0===t?e:[...e,new s.Brick(n.BRICK_WIDTH,n.BRICK_HEIGHT,{x:a,y:l},n.BRICK_ENERGY[t],n.BRICK_IMAGES[t])]}),[])}},607:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.langButton=t.playSoundAsync=void 0;const n=i(480),o=i(358),r=i(544),a=i(436),l=s(i(570)),c=s(i(748)),d=i(56),h=i(382);(0,i(301).clock)();let u=!1,g=0;const p=document.getElementById("title"),m=document.getElementById("win"),v=document.getElementById("start"),y=document.getElementById("mute"),f=document.querySelector(".line"),E=document.getElementById("info");let L;function _(){L=setInterval((()=>{E.style.visibility="visible"==E.style.visibility?"hidden":"visible"}),750)}setTimeout((()=>{p.style.opacity="1",p.style.scale="1"}),400),_();let I=.7;function D(e){const t=new Audio;t.src=`${e}`,t.play(),t.volume=I}t.playSoundAsync=D;const A={start:"./audio/sfx-1.mp3",gameover:"./audio/sfx-2.mp3",win:"./audio/win.mp3",collision:"./audio/sfx-3.mp3"};y.onclick=function(){0!=I?(I=0,null==f||f.classList.toggle("hide-line")):(I=.7,null==f||f.classList.toggle("hide-line"))},v.addEventListener("click",(()=>{p.style.display="none",D(A.start),v.setAttribute("disabled","disabled")}));let S="en",w=0;const T=()=>w++,B=()=>{w=0};function b(e,t,i,s,n){return console.log("draw!"),e.clear(),e.drawBricks(t),e.drawSprite(i),e.drawSprite(s),s.moveBall(),(i.isMovingLeft&&i.pos.x>0||i.isMovingRight&&i.pos.x<e.canvas.width-i.width)&&i.movePaddle(),n.checkBallCollision(s,i,e),n.isCollidingBricks(s,t)&&(g+=1,e.drawScore(g),D(A.collision)),s.pos.y>e.canvas.height&&(u=!0),0===t.length?function(e){"en"==S?e.drawInfo("Level Complete!"):e.drawInfo("Уровень пройден!"),u=!1,D(A.win),T(),v.removeAttribute("disabled"),w>=3&&(B(),e.clear(),m.innerHTML="en"==S?'\n        <p>Congratulations! You win the game.</p>\n        <img src="images/cool.png">':'\n        <p>Поздравляем! Вы прошли игру.</p>\n        <img src="images/cool.png">',m.style.opacity="1",m.style.scale="1")}(e):u?function(e){"en"==S?e.drawInfo("Game Over!"):e.drawInfo("Игра окончена!"),u=!1,D(A.gameover),B(),v.removeAttribute("disabled")}(e):void requestAnimationFrame((()=>b(e,t,i,s,n)))}let R;t.langButton=document.querySelector(".lang"),document.getElementById("start"),t.langButton.addEventListener("click",(e=>{const t=document.querySelectorAll(".lang p"),i=e.target.closest("p");i&&(t.forEach((e=>e.classList.remove("active"))),function(e){R&&R.classList.remove("active"),R=e,R.classList.add("active")}(i),i&&(S=i.textContent,x.getLang=i.textContent),"en"==i.textContent?v.textContent="Start":v.textContent="Старт")}));const x=new n.CanvasView("#playField");x.initStartButton((function(e){_(),g=0,e.drawInfo(""),e.drawScore(0),e.drawLevel(w),clearInterval(L),m.innerHTML="";const t=new a.Collision,i=(0,h.createBricks)(d.LEVEL,w),s=new o.Ball(d.BALL_SPEED,d.BALL_SIZE,{x:d.BALL_STARTX,y:d.BALL_STARTY},c.default);b(e,i,new r.Paddle(d.PADDLE_SPEED,d.PADDLE_WIDTH,d.PADDLE_HEIGHT,{x:d.PADDLE_STARTX,y:e.canvas.height-d.PADDLE_HEIGHT-5},l.default),s,t)}))},56:function(e,t,i){var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.LEVEL=t.BRICK_ENERGY=t.BRICK_IMAGES=t.BALL_STARTY=t.BALL_STARTX=t.BALL_SIZE=t.BALL_SPEED=t.PADDLE_SPEED=t.PADDLE_STARTX=t.PADDLE_HEIGHT=t.PADDLE_WIDTH=t.BRICK_HEIGHT=t.BRICK_WIDTH=t.BRICK_PADDING=t.STAGE_COLS=t.STAGE_ROWS=t.STAGE_PADDING=void 0;const n=s(i(71)),o=s(i(615)),r=s(i(712)),a=s(i(77)),l=s(i(966)),c=document.querySelector("#playField");t.STAGE_PADDING=10,t.STAGE_ROWS=20,t.STAGE_COLS=10,t.BRICK_PADDING=5,t.BRICK_WIDTH=c?Math.floor((c.width-2*t.STAGE_PADDING)/t.STAGE_COLS)-t.BRICK_PADDING:100,t.BRICK_HEIGHT=c?Math.floor((c.height-2*t.STAGE_PADDING)/t.STAGE_ROWS)-t.BRICK_PADDING:30,t.PADDLE_WIDTH=150,t.PADDLE_HEIGHT=25,t.PADDLE_STARTX=450,t.PADDLE_SPEED=10,t.BALL_SPEED=5,t.BALL_SIZE=20,t.BALL_STARTX=500,t.BALL_STARTY=400,t.BRICK_IMAGES={1:n.default,2:r.default,3:a.default,4:o.default,5:l.default},t.BRICK_ENERGY={1:1,2:1,3:2,4:2,5:3},t.LEVEL=[[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,2,2,2,2,2,2,2,2,0,0,1,2,3,3,3,3,2,1,0,0,0,3,4,4,4,4,3,0,0,0,0,2,4,0,0,4,2,0,0],[0,2,0,2,0,2,0,3,2,0,1,0,1,0,1,0,1,0,0,1,0,2,2,2,2,2,2,2,2,0,1,3,3,0,3,3,0,3,3,1,0,0,4,4,4,4,4,4,0,0,0,3,0,4,0,0,4,0,0,0,0,0,5,5,4,0,5,5,0,0,0,5,0,5,0,5,5,5,5,0,1,0,0,3,2,2,3,0,0,1],[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,2,2,2,2,2,2,2,2,0,0,3,3,3,3,3,3,3,3,0,3,0,4,4,4,4,4,4,0,3,0,3,4,4,0,0,4,4,0,3,0,0,4,4,0,4,4,4,0,0,0,2,3,3,4,0,3,3,2,0,0,2,0,2,0,0,2,0,2,0,1,0,1,0,4,4,0,1,0,1,3,0,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,3],[0,0,3,2,1,1,2,3,0,0,1,1,0,0,1,1,0,0,1,1,0,2,2,2,2,2,2,2,2,0,0,3,0,3,3,0,3,3,3,0,3,0,2,0,0,3,2,4,0,3,0,3,0,3,0,2,0,0,0,3,0,0,4,2,0,2,4,4,0,0,0,2,0,1,0,1,0,3,2,0,0,2,0,5,0,0,5,0,2,0,1,3,1,0,3,4,0,1,0,1,0,0,0,3,5,3,0,0,4,0,0,3,0,3,0,0,0,0,3,0,2,0,2,0,0,0,0,2,0,2]]},358:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Ball=void 0,t.Ball=class{constructor(e,t,i,s){this.ballSize=t,this.position=i,this.ballImage=new Image,this.ballSize=t,this.position=i,this.speed={x:e,y:-e},this.ballImage.src=s}get width(){return this.ballSize}get height(){return this.ballSize}get pos(){return this.position}get image(){return this.ballImage}changeYDirection(){this.speed.y=-this.speed.y}changeXDirection(){this.speed.x=-this.speed.x}moveBall(){this.pos.x+=this.speed.x,this.pos.y+=this.speed.y}}},135:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Brick=void 0,t.Brick=class{constructor(e,t,i,s,n){this.brickWidth=e,this.brickHeight=t,this.position=i,this.brickEnergy=s,this.brickImage=new Image,this.brickWidth=e,this.brickHeight=t,this.position=i,this.brickEnergy=s,this.brickImage.src=n}get width(){return this.brickWidth}get height(){return this.brickHeight}get pos(){return this.position}get image(){return this.brickImage}get energy(){return this.brickEnergy}set energy(e){this.brickEnergy=e}}},544:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Paddle=void 0;let i=0,s=0;document.getElementById("#playField"),t.Paddle=class{constructor(e,t,n,o,r){this.speed=e,this.paddleWidth=t,this.paddleHeight=n,this.position=o,this.paddleImage=new Image,this.handleKeyUp=e=>{"ArrowLeft"!==e.code&&"ArrowLeft"!==e.key||(this.moveLeft=!1),"ArrowRight"!==e.code&&"ArrowRight"!==e.key||(this.moveRight=!1)},this.handleKeyDown=e=>{"ArrowLeft"!==e.code&&"ArrowLeft"!==e.key||(this.moveLeft=!0),"ArrowRight"!==e.code&&"ArrowRight"!==e.key||(this.moveRight=!0)},this.handleTouchStart=e=>{i=e.changedTouches[0].screenX},this.handleTouchEnd=e=>{s=0,this.changeDirection(),console.log("Stop")},this.handleTouchMove=e=>{s=e.changedTouches[0].screenX,this.changeDirection(),console.log(s)},this.speed=e,this.paddleWidth=t,this.paddleHeight=n,this.position=o,this.moveLeft=!1,this.moveRight=!1,this.paddleImage.src=r,document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp),document.addEventListener("touchstart",this.handleTouchStart),document.addEventListener("touchmove",this.handleTouchMove),document.addEventListener("touchend",this.handleTouchEnd)}get width(){return this.paddleWidth}get height(){return this.paddleHeight}get pos(){return this.position}get image(){return this.paddleImage}get isMovingLeft(){return this.moveLeft}get isMovingRight(){return this.moveRight}movePaddle(){this.moveLeft&&(this.pos.x-=this.speed),this.moveRight&&(this.pos.x+=this.speed)}changeDirection(){if(!s)return this.moveLeft=!1,void(this.moveRight=!1);s<i&&(this.moveLeft=!0),s>i&&(this.moveRight=!0)}}},480:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.CanvasView=void 0,t.CanvasView=class{constructor(e){this.canvas=document.querySelector(e),this.context=this.canvas.getContext("2d"),this.scoreDisplay=document.querySelector("#score"),this.start=document.querySelector("#start"),this.info=document.querySelector("#info"),this.levelNumber=document.getElementById("levelNumber"),this.languages="en"}get getLang(){return this.languages}set getLang(e){this.languages=e}clear(){var e;null===(e=this.context)||void 0===e||e.clearRect(0,0,this.canvas.width,this.canvas.height)}initStartButton(e){var t;null===(t=this.start)||void 0===t||t.addEventListener("click",(()=>e(this)))}drawScore(e){this.scoreDisplay&&"en"==this.languages?this.scoreDisplay.innerHTML=`Kick: ${e.toString()}`:this.scoreDisplay&&"ru"==this.languages&&(this.scoreDisplay.innerHTML=`Ударов: ${e.toString()}`)}drawLevel(e){this.levelNumber&&"en"==this.languages?this.levelNumber.innerHTML="Level: "+ ++e:this.levelNumber&&"ru"==this.languages&&(this.levelNumber.innerHTML="Уровень: "+ ++e)}drawInfo(e){this.info&&(this.info.innerHTML=e)}drawSprite(e){var t;e&&(null===(t=this.context)||void 0===t||t.drawImage(e.image,e.pos.x,e.pos.y,e.width,e.height))}drawBricks(e){e.forEach((e=>this.drawSprite(e)))}}},748:(e,t,i)=>{e.exports=i.p+"36a994b56e9bf94330bf.png"},615:(e,t,i)=>{e.exports=i.p+"c52965c3f51bdaa4cc83.png"},712:(e,t,i)=>{e.exports=i.p+"6d784c0bbf56dfdead6a.png"},966:(e,t,i)=>{e.exports=i.p+"ee6956f23a17bd51fc9e.png"},71:(e,t,i)=>{e.exports=i.p+"c9e9619857172bfb4768.png"},77:(e,t,i)=>{e.exports=i.p+"c793cf9d041ba887610d.png"},570:(e,t,i)=>{e.exports=i.p+"4d0c0105a195f17ff69c.png"}},t={};function i(s){var n=t[s];if(void 0!==n)return n.exports;var o=t[s]={exports:{}};return e[s].call(o.exports,o,o.exports,i),o.exports}i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{var e;i.g.importScripts&&(e=i.g.location+"");var t=i.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var s=t.getElementsByTagName("script");s.length&&(e=s[s.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=e})(),i(607)})();