import moment from "moment";

export const getRemainingTime = ({
  startTime,
  hintsUsed,
  solutionsUsed,
  totalTime,
  freeHintsNumber,
  freeSolutionPenalty,
  hintPenalty,
  solutionPenalty,
  navigate
}) => {
  const diff = moment().diff(startTime, "seconds");
  const safeTimeRemaining = totalTime - diff;
  const notFreeHints = hintsUsed.length - freeHintsNumber;
  const hintPenaltyTotal = notFreeHints > 0 ? notFreeHints * hintPenalty : 0;
  const freeHintsUsed =
    notFreeHints > 0
      ? [...hintsUsed.slice(0, freeHintsNumber)]
      : [...hintsUsed];
  let notFreeHintsSolutions = 0;
  solutionsUsed.map((solution) => {
    if (!freeHintsUsed.includes(solution)) {
      notFreeHintsSolutions++;
    }
    return solution;
  });
  const freeHintsSolutions = solutionsUsed.length - notFreeHintsSolutions;
  const freeHintsSolutionsPenaltyTotal =
    freeHintsSolutions * freeSolutionPenalty;
  const notFreeHintsSolutionsPenaltyTotal =
    notFreeHintsSolutions * solutionPenalty;
  const soltuionsPenaltyTotal =
    freeHintsSolutionsPenaltyTotal + notFreeHintsSolutionsPenaltyTotal;

  const total=(safeTimeRemaining - hintPenaltyTotal - soltuionsPenaltyTotal)
  if(total<0){
    if(navigate){
      navigate('/pre-score')
    }
    return 0
  }
  return total;
};
