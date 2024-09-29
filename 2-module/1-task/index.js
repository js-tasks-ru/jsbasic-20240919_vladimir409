function sumSalary(salaries) {
  let total = 0;

  for (let key in salaries) {
    if (typeof salaries[key] === 'number' && 
        !isNaN(salaries[key]) && 
        isFinite(salaries[key])) {
      total += salaries[key];
    }
  }
  return total;
}