function getMinMax(str) {
  const numbers = str.split(' ')
      .map(Number)
      .filter(num => !isNaN(num));

  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return { min, max };
}