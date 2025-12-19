/* ---------- Dice Roll ---------- */
function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  document.getElementById('diceResult').innerText = `You rolled a ${dice}!`;
  saveScore('Dice Roll', dice);
}

/* ---------- Clicker Game ---------- */
let clickScore = 0, clickTime = 10;
const clickButton = document.getElementById('clickButton');
clickButton.onclick = () => clickScore++;
setInterval(() => {
  if(clickTime>0){
    clickTime--;
    document.getElementById('clickScore').innerText = `Score: ${clickScore} | Time left: ${clickTime}s`;
  } else {
    alert(`Time's up! Clicker Score: ${clickScore}`);
    saveScore('Clicker Game', clickScore);
    clickScore=0; clickTime=10;
  }
},1000);

/* ---------- Reaction Time Game ---------- */
let reactionStart = null;
function reactionClicked() {
  if(!reactionStart){
    document.getElementById('reactionButton').innerText = "Wait...";
    setTimeout(() => {
      reactionStart = new Date().getTime();
      document.getElementById('reactionButton').innerText = "Click NOW!";
    }, Math.random()*3000+1000);
  } else {
    const reactionTime = new Date().getTime() - reactionStart;
    document.getElementById('reactionResult').innerText = `Time: ${reactionTime} ms`;
    saveScore('Reaction Time', Math.max(0, 1000 - reactionTime));
    reactionStart = null;
    document.getElementById('reactionButton').innerText = "Click to Start";
  }
}

/* ---------- Leaderboard ---------- */
function saveScore(game, score) {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  leaderboard.push({game, score});
  leaderboard.sort((a,b)=>b.score-a.score);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  displayLeaderboard();
}

function displayLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  let list = document.getElementById('leaderboardList');
  list.innerHTML = '';
  leaderboard.slice(0,10).forEach((entry,index)=>{
    let li = document.createElement('li');
    li.innerText = `${index+1}. ${entry.game} - ${entry.score}`;
    list.appendChild(li);
  });
}

/* ---------- Initial Display ---------- */
displayLeaderboard();
