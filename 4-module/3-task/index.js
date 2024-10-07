function highlight(table) {
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(row => {
      const statusCell = row.cells[3]; 
      const genderCell = row.cells[2];
      const ageCell = row.cells[1];

      const available = statusCell.getAttribute('data-available');
      if (available === 'true') {
          row.classList.add('available');
      } else if (available === 'false') {
          row.classList.add('unavailable');
      } else {
          row.setAttribute('hidden', '');
      }

      if (genderCell.textContent.trim() === 'm') {
          row.classList.add('male');
      } else if (genderCell.textContent.trim() === 'f') {
          row.classList.add('female');
      }

      if (parseInt(ageCell.textContent.trim(), 10) < 18) {
          row.style.textDecoration = 'line-through';
      }
  });
}
