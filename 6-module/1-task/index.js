/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = this.createBody(rows);
  }

  createThead() {
    const container = document.createElement('tr');
    const thead = ['Имя', 'Возраст', 'Зарплата', 'Город'];
    for (let i = 0; i <= thead.length; i ++) {
      const cell = document.createElement('td');
      if (i < thead.length) {
        cell.textContent = thead[i];
      }
      container.append(cell);
    }
    return container;
  }

  createRow(row) {
    const container = document.createElement('tr');
    const keys = Object.keys(row);
    for (let i = 0; i <= keys.length; i ++) {
      const cell = document.createElement('td');
      if (i < keys.length) {
        cell.textContent = row[keys[i]];
      } else {
        const btn = document.createElement('button');
        btn.textContent = 'x';
        cell.append(btn);
      }
      container.append(cell);
    }

    return container;
  }

  createBody(template) {
    const container = document.createElement('table');
    const head = document.createElement('thead');
    const body = document.createElement('tbody');
    head.append(this.createThead());
    container.append(head);
    for (let j of template) {
      body.append(this.createRow(j));
    }
    container.append(body);
    container.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const row = e.target.closest('tr');
        row.remove();
      }
    });
    return container;
  }

}