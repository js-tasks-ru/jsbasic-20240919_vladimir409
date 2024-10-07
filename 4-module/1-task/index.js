  function makeFriendsList(data) {
    const ul = document.createElement('ul');
    const dataNew = data.map(item => {

        return `${item.firstName} ${item.lastName}`

    });
    for (let i = 0; i < dataNew.length; i++) {
      
    const li = document.createElement('li');
        li.innerHTML = `${dataNew[i]}`;
        ul.appendChild(li);
    }

return ul;

  }
