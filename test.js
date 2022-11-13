let homeScores = [null, 1, 3];
let awayScores = [null, 4, 3];

let realHomeScores = [null, 1, 2];
let realAwayScores = [null, 2, 2];

let points = 0;

for (let i = 0; i < homeScores.length; i++) {
  if (realHomeScores[i] !== null && realAwayScores[i] !== null) {
    if (
      homeScores[i] > awayScores[i] &&
      realHomeScores[i] > realAwayScores[i]
    ) {
      points +=
        10 -
        (Math.abs(realHomeScores[i] - homeScores[i]) +
          Math.abs(realAwayScores[i] - awayScores[i]));
    } else if (
      homeScores[i] < awayScores[i] &&
      realHomeScores[i] < realAwayScores[i]
    ) {
      points +=
        10 -
        (Math.abs(realHomeScores[i] - homeScores[i]) +
          Math.abs(realAwayScores[i] - awayScores[i]));
    } else if (
      homeScores[i] === awayScores[i] &&
      realHomeScores[i] === realAwayScores[i]
    ) {
      points +=
        10 -
        (Math.abs(realHomeScores[i] - homeScores[i]) +
          Math.abs(realAwayScores[i] - awayScores[i]));
    }
  }
}

console.log(points, "points");
