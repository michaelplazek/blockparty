export const truncateString = input => {
  if (input.length < 25) {
    return input;
  }
  const count = 10;
  let output = "";
  output = output.concat(
    input.slice(0, count),
    "..............",
    input.slice(input.length - count, input.length - 1)
  );
  return output;
};