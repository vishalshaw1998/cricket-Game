var teamOnePlayerScore = {
    player1: [null, null, null, null, null, null, { total: 0 }],
    player2: [null, null, null, null, null, null, { total: 0 }],
    player3: [null, null, null, null, null, null, { total: 0 }],
    player4: [null, null, null, null, null, null, { total: 0 }],
    player5: [null, null, null, null, null, null, { total: 0 }],
    player6: [null, null, null, null, null, null, { total: 0 }],
    player7: [null, null, null, null, null, null, { total: 0 }],
    player8: [null, null, null, null, null, null, { total: 0 }],
    player9: [null, null, null, null, null, null, { total: 0 }],
    player10: [null, null, null, null, null, null, { total: 0 }]
};
var teamTwoPlayerScore = {
    player1: [null, null, null, null, null, null, { total: 0 }],
    player2: [null, null, null, null, null, null, { total: 0 }],
    player3: [null, null, null, null, null, null, { total: 0 }],
    player4: [null, null, null, null, null, null, { total: 0 }],
    player5: [null, null, null, null, null, null, { total: 0 }],
    player6: [null, null, null, null, null, null, { total: 0 }],
    player7: [null, null, null, null, null, null, { total: 0 }],
    player8: [null, null, null, null, null, null, { total: 0 }],
    player9: [null, null, null, null, null, null, { total: 0 }],
    player10: [null, null, null, null, null, null, { total: 0 }]
};
var timerOne = 60;
var timerTwo = 60;
var gameEnded = false;
var teamOneScore = 0;
var teamTwoScore = 0;
var changePlayer = false;
var changeTeams = false;
var timer;
var timer2;
var currentTeam = "team1";
var currentPlayer = "player1";
var currentBall = 1;
var Player = /** @class */ (function () {
    function Player(team, player) {
        this.team = team;
        this.player = player;
    }
    Player.prototype.getRun = function () {
        if (this.team === "team1") {
            //Player Made Run
            var run = Math.floor(Math.random() * 7);
            if (run == 5) {
                while (run == 5) {
                    run = Math.floor(Math.random() * 7);
                }
            }
            //Update the Score of One Array
            teamOnePlayerScore[this.player][currentBall - 1] = run;
            //Update the total run by the current player
            var totalOfCurrentPlayer = teamOnePlayerScore[this.player].reduce(function (acc, item) {
                return acc + item;
            }, 0);
            teamOnePlayerScore[this.player][6].total = parseInt(totalOfCurrentPlayer);
            //Update the DOM
            var tempRunNode = document.getElementsByClassName(this.team + "-" + this.player + "-total")[0];
            tempRunNode.innerHTML = String(parseInt(totalOfCurrentPlayer));
            var tempNode = document.getElementsByClassName(this.team + "-" + this.player + "-ball" + currentBall)[0];
            tempNode.innerHTML = "" + run;
            //Update the Score Of Team.
            teamOneScore += run;
            var teamScoreNode = document.getElementsByClassName("team-1-score")[0];
            teamScoreNode.innerHTML = "" + teamOneScore;
            currentBall += 1;
            //Player Playing Last ball Of the session or Last Player is Out
            if ((this.player === "player10" && currentBall === 7) ||
                (this.player === "player10" && run == 0)) {
                changeTeams = true;
                hitByTeamOne.setAttribute("disabled", "true");
                hitByTeamTwo.removeAttribute("disabled");
                currentTeam = "team2";
                currentPlayer = "player1";
                currentBall = 1;
                clearInterval(timer);
                document.getElementsByClassName("timer")[0].innerHTML = "60";
            }
            //If The Player Plays last ball of the over or He Is Out.
            if (run == 0 || currentBall == 7) {
                changePlayer = true;
                return;
            }
        }
        if (this.team === "team2") {
            var run = Math.floor(Math.random() * 7);
            if (run == 5) {
                while (run == 5) {
                    run = Math.floor(Math.random() * 7);
                }
            }
            teamTwoPlayerScore[this.player][currentBall - 1] = run;
            var totalOfCurrentPlayer = teamTwoPlayerScore[this.player].reduce(function (acc, item) {
                return acc + item;
            }, 0);
            teamTwoPlayerScore[this.player][6].total = parseInt(totalOfCurrentPlayer);
            var tempRunNode = document.getElementsByClassName(this.team + "-" + this.player + "-total")[0];
            tempRunNode.innerHTML = String(parseInt(totalOfCurrentPlayer));
            var tempNode = document.getElementsByClassName(this.team + "-" + this.player + "-ball" + currentBall)[0];
            tempNode.innerHTML = "" + run;
            teamTwoScore += run;
            var teamScoreNode = document.getElementsByClassName("team-2-score")[0];
            teamScoreNode.innerHTML = "" + teamTwoScore;
            currentBall += 1;
            if ((this.player === "player10" && currentBall === 7) ||
                (this.player === "player10" && run == 0) ||
                teamOneScore < teamTwoScore) {
                gameEnded = true;
                hitByTeamOne.setAttribute("disabled", "true");
                hitByTeamTwo.setAttribute("disabled", "true");
                var getResult_1 = document.getElementsByClassName("getResult")[0];
                getResult_1.removeAttribute("disabled");
                clearInterval(timer2);
                document.getElementsByClassName("timer")[0].innerHTML = "Game Ended";
            }
            if (run == 0 || currentBall == 7) {
                changePlayer = true;
                return;
            }
        }
    };
    return Player;
}());
//<--!--------------------------------------------------------------------------------------------!----------------->
//Creating DOM
var container = document.createElement("div");
container.setAttribute("class", "container");
var headingOfCriket = document.createElement("h1");
headingOfCriket.setAttribute("class", "text-center");
headingOfCriket.innerHTML = "CRICKET 10";
var hr1 = document.createElement("hr");
var row1 = document.createElement("div");
row1.setAttribute("class", "row");
var row1col1 = document.createElement("div");
row1col1.setAttribute("class", "col-4");
row1col1.innerHTML =
    "<div class=text-center><h5>TEAM 1 SCORE</h5><div class = team-1-score>0</div><button class = 'btn btn-primary mt-2 team-1-hit'>HIT</button></div>";
row1.appendChild(row1col1);
var row1col2 = document.createElement("div");
row1col2.setAttribute("class", "col-4");
row1col2.innerHTML =
    "<div class=text-center><h5> TIMER </h5><h3 class = timer>60</h3></div>";
row1.appendChild(row1col2);
var row1col3 = document.createElement("div");
row1col3.setAttribute("class", "col-4");
row1col3.innerHTML =
    "<div class=text-center><h5>TEAM 2 SCORE</h5><div class = team-2-score>0</div><button disabled = true class = 'btn btn-primary mt-2 team-2-hit'>HIT</button></div>";
row1.appendChild(row1col3);
var hr2 = document.createElement("hr");
container.appendChild(headingOfCriket);
container.appendChild(hr1);
container.appendChild(row1);
container.appendChild(hr2);
var row2 = document.createElement("div");
row2.setAttribute("class", "text-center");
var getResult = document.createElement("button");
getResult.setAttribute("class", "btn btn-primary getResult");
getResult.disabled = true;
getResult.innerHTML = "GET RESULT";
row2.appendChild(getResult);
var row3 = document.createElement("div");
row3.setAttribute("class", "row");
var row3col1 = document.createElement("div");
row3col1.setAttribute("class", "col-4 text-center font-weight-bold");
row3col1.innerHTML = "Team 1 Score Card";
var row3col2 = document.createElement("div");
row3col2.setAttribute("class", "col-4");
var row3col3 = document.createElement("div");
row3col3.setAttribute("class", "col-4 text-center font-weight-bold");
row3col3.innerHTML = "Team 2 Score Card";
row3.appendChild(row3col1);
row3.appendChild(row3col2);
row3.appendChild(row3col3);
var row4 = document.createElement("div");
row4.setAttribute("class", "row");
var row4col1 = document.createElement("div");
row4col1.setAttribute("class", "col-5");
var table = document.createElement("table");
table.setAttribute("border", "1");
for (var i = 1; i < 12; i++) {
    var temptr = document.createElement("tr");
    for (var j = 1; j < 9; j++) {
        if (j == 1 && i == 1) {
            var temptd = document.createElement("th");
            temptd.setAttribute("class", "text-center");
            temptd.innerHTML = "Team 1";
        }
        else if (j == 1) {
            var temptd = document.createElement("th");
            temptd.setAttribute("class", "text-center");
            temptd.innerHTML = "Player " + (i - 1);
        }
        else if (i == 1 && j > 1 && j < 8) {
            var temptd = document.createElement("th");
            temptd.setAttribute("class", "text-center");
            temptd.innerHTML = "Ball " + (j - 1);
        }
        else if (i == 1 && j == 8) {
            var temptd = document.createElement("th");
            temptd.setAttribute("class", "text-center");
            temptd.innerHTML = "Total";
        }
        else if (j == 8) {
            var temptd = document.createElement("td");
            temptd.setAttribute("class", "text-center team1-player" + (i - 1) + "-total");
            temptd.innerHTML = "";
        }
        else {
            var temptd = document.createElement("td");
            temptd.setAttribute("class", "text-center team1-player" + (i - 1) + "-ball" + (j - 1));
            temptd.innerHTML = "";
        }
        temptr.appendChild(temptd);
    }
    table.appendChild(temptr);
}
row4col1.appendChild(table);
row4.appendChild(row4col1);
var row4col2 = document.createElement("div");
row4col2.setAttribute("class", "col-2 results");
row4col2.innerHTML = "";
row4.appendChild(row4col2);
var row4col3 = document.createElement("div");
row4col3.setAttribute("class", "col-5");
var table1 = document.createElement("table");
table1.setAttribute("border", "1");
for (var i = 1; i < 12; i++) {
    var temptr = document.createElement("tr");
    for (var j = 1; j < 9; j++) {
        if (j == 1 && i == 1) {
            var temptd = document.createElement("th");
            temptd.setAttribute("class", "text-center");
            temptd.innerHTML = "Team 2";
        }
        else if (j == 1) {
            var temptd = document.createElement("th");
            temptd.setAttribute("class", "text-center");
            temptd.innerHTML = "Player " + (i - 1);
        }
        else if (i == 1 && j > 1 && j < 8) {
            var temptd = document.createElement("th");
            temptd.setAttribute("class", "text-center");
            temptd.innerHTML = "Ball " + (j - 1);
        }
        else if (i == 1 && j == 8) {
            var temptd = document.createElement("th");
            temptd.setAttribute("class", "text-center");
            temptd.innerHTML = "Total";
        }
        else if (j == 8) {
            var temptd = document.createElement("td");
            temptd.setAttribute("class", "text-center team2-player" + (i - 1) + "-total");
            temptd.innerHTML = "";
        }
        else {
            var temptd = document.createElement("td");
            temptd.setAttribute("class", "text-center team2-player" + (i - 1) + "-ball" + (j - 1));
            temptd.innerHTML = "";
        }
        temptr.appendChild(temptd);
    }
    table1.appendChild(temptr);
}
row4col3.appendChild(table1);
row4.appendChild(row4col3);
container.appendChild(row2);
container.appendChild(row3);
container.appendChild(row4);
document.body.appendChild(container);
//<----!------------------------------------------------------Event Handlers--------------------------------------!--->
//Initializing the Players in each teams
var teamOne = [
    new Player("team1", "player1"),
    new Player("team1", "player2"),
    new Player("team1", "player3"),
    new Player("team1", "player4"),
    new Player("team1", "player5"),
    new Player("team1", "player6"),
    new Player("team1", "player7"),
    new Player("team1", "player8"),
    new Player("team1", "player9"),
    new Player("team1", "player10"),
];
var teamTwo = [
    new Player("team2", "player1"),
    new Player("team2", "player2"),
    new Player("team2", "player3"),
    new Player("team2", "player4"),
    new Player("team2", "player5"),
    new Player("team2", "player6"),
    new Player("team2", "player7"),
    new Player("team2", "player8"),
    new Player("team2", "player9"),
    new Player("team2", "player10"),
];
var currentPlayerIndexTeamOne = 0;
var currentPlayerIndexTeamTwo = 0;
var hitByTeamOne = document.querySelectorAll(".team-1-hit")[0];
hitByTeamOne.addEventListener("click", function () {
    if (currentPlayer == "player1" &&
        currentBall == 1 &&
        currentTeam == "team1") {
        timer = setInterval(function () {
            timerOne = timerOne - 1;
            document.getElementsByClassName("timer")[0].innerHTML = "" + timerOne;
            if (timerOne == 0) {
                clearInterval(timer);
                changeTeams = true;
                hitByTeamOne.setAttribute("disabled", "true");
                hitByTeamTwo.removeAttribute("disabled");
                currentTeam = "team2";
                currentPlayer = "player1";
                currentBall = 1;
            }
        }, 1000);
        teamOne[currentPlayerIndexTeamOne].getRun();
        return;
    }
    if (changePlayer == true) {
        currentPlayerIndexTeamOne += 1;
        currentBall = 1;
        changePlayer = false;
    }
    teamOne[currentPlayerIndexTeamOne].getRun();
});
var hitByTeamTwo = document.querySelectorAll(".team-2-hit")[0];
hitByTeamTwo.addEventListener("click", function () {
    if (currentPlayer == "player1" &&
        currentBall == 1 &&
        currentTeam == "team2") {
        changePlayer = false;
        timer2 = setInterval(function () {
            timerTwo = timerTwo - 1;
            document.getElementsByClassName("timer")[0].innerHTML = "" + timerTwo;
            if (timerTwo == 0) {
                clearInterval(timer2);
                gameEnded = true;
                hitByTeamOne.setAttribute("disabled", "true");
                hitByTeamTwo.setAttribute("disabled", "true");
                var getResult_2 = document.getElementsByClassName("getResult")[0];
                getResult_2.removeAttribute("disabled");
                document.getElementsByClassName("timer")[0].innerHTML = "Game Ended";
            }
        }, 1000);
        teamTwo[currentPlayerIndexTeamTwo].getRun();
        return;
    }
    if (changePlayer == true) {
        currentPlayerIndexTeamTwo += 1;
        currentBall = 1;
        changePlayer = false;
    }
    teamTwo[currentPlayerIndexTeamTwo].getRun();
});
var resultBtn = document.getElementsByClassName("getResult")[0];
resultBtn.addEventListener("click", function () {
    if (teamTwoScore > teamOneScore) {
        var resultNode = document.getElementsByClassName("results")[0];
        var maxRun = 0;
        var manOfThematch = void 0;
        for (var i in teamTwoPlayerScore) {
            if (teamTwoPlayerScore[i][6].total > maxRun) {
                maxRun = teamTwoPlayerScore[i][6].total;
                manOfThematch = i;
            }
        }
        resultNode.innerHTML = "<div>\n                                    <h5 class = text-center>Winner Team</h5>\n                                    <h3 class = text-center>Team 2</h3>\n                                    <hr>\n                                    <h5 class = text-center>Man Of The Match</h5>\n                                    <h3 class = text-center>" + manOfThematch + "</h3>\n                                    <h5 class = text-center>Runs Scored</h5>\n                                    <h3 class = text-center>" + maxRun + "</h3>\n                                </div>";
    }
    else if (teamTwoScore < teamOneScore) {
        var resultNode = document.getElementsByClassName("results")[0];
        var maxRun = 0;
        var manOfThematch = void 0;
        for (var i in teamOnePlayerScore) {
            if (teamOnePlayerScore[i][6].total > maxRun) {
                maxRun = teamOnePlayerScore[i][6].total;
                manOfThematch = i;
            }
        }
        resultNode.innerHTML = "<div>\n                                    <h5 class = text-center >Winner Team</h5>\n                                    <h3 class = text-center>Team 1</h3>\n                                    <hr>\n                                    <h5 class = text-center>Man Of The Match</h5>\n                                    <h3 class = text-center>" + manOfThematch + "</h3>\n                                    <h5 class = text-center>Runs Scored</h5>\n                                    <h3 class = text-center>" + maxRun + "</h3>\n                                </div>";
    }
    else {
        var resultNode = document.getElementsByClassName("results")[0];
        var fromTeam = void 0;
        var maxRun = 0;
        var manOfThematch = void 0;
        for (var i_1 in teamTwoPlayerScore) {
            if (teamTwoPlayerScore[i_1][6].total > maxRun) {
                maxRun = teamTwoPlayerScore[i_1][6].total;
                manOfThematch = i_1;
                fromTeam = "Team 2";
            }
        }
        for (var i_2 in teamOnePlayerScore) {
            if (teamOnePlayerScore[i_2][6].total > maxRun) {
                maxRun = teamOnePlayerScore[i_2][6].total;
                manOfThematch = i_2;
                fromTeam = "Team 1";
            }
        }
        resultNode.innerHTML = "<div>\n                                    <h3 class = text-center>Game Drawn</h3>\n                                    <hr>\n                                    <h5 class = text-center>Man Of The Match</h5>\n                                    <h5 class = text-center>" + fromTeam + "</h5>\n                                    <h3 class = text-center>" + manOfThematch + "</h3>\n                                    <h5 class = text-center>Runs Scored</h5>\n                                    <h3 class = text-center>" + maxRun + "</h3>\n                                </div>";
    }
});
