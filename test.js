let homeScores = [null, 3];
let awayScores = [null, 2];

let realHomeScores = [null, 1];
let realAwayScores = [null, 2];

let points = 0;

for (let i = 0; i < homeScores.length; i++) {
  if (homeScores[i] || awayScores[i] !== null) {
    if (homeScores[i] > awayScores[i]) {
      if (
        homeScores[i] === realHomeScores[i] &&
        awayScores[i] === realAwayScores[i]
      ) {
        points += 10;
      } else {
        // check the goal difference and subtract 1 for each goal difference
        points += 10 - (homeScores[i] - awayScores[i]);
      }
    } else if (homeScores[i] < awayScores[i]) {
      if (
        homeScores[i] === realHomeScores[i] &&
        awayScores[i] === realAwayScores[i]
      ) {
        points += 10;
      } else {
        // check the goal difference and subtract 1 for each goal difference
        points += 10 - (awayScores[i] - homeScores[i]);
      }
    } else {
      points += 10;
    }
  }
}

console.log(points);
