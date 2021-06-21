document.addEventListener('DOMContentLoaded', function(){

fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
.then(resp => resp.json())
.then((data)=>{
    const monsters = Object.values(data)
    const createMonsterDiv = document.getElementById('create-monster')
    let monsterContainerUl = document.getElementById('monster-container-ul')
    const backButton = document.getElementById('back')
    const forwardButton = document.getElementById('forward')
    console.log(monsterContainerUl.parentNode.childNodes[1])
    let monster, mCListItem, monsterName, monsterDetails, monsterAge, monsterDescription
    let mCList = monsterContainerUl.appendChild(document.createElement('li'))
    for(let i=0; i<monsters.length; i++){
       monster = monsters[i]
       monsterName = monster.name
       monsterAge = monster.age
       monsterDescription = monster.description
       mCListItem = mCList.appendChild(document.createElement('li'))
       mCListItem.innerHTML = monsterName
       mCListItem.setAttribute('id', monsterName)
       monsterDetails = mCListItem.appendChild(document.createElement('ul'))
       monsterDetails.setAttribute('class', 'monster-info')
       monsterAgeLi = monsterDetails.appendChild(document.createElement('li'))
       monsterAgeLi.setAttribute('class', 'monster-age-li')
       monsterAgeLi.innerHTML = "<strong>Age: </strong>"+monsterAge
       monsterDescLi = monsterDetails.appendChild(document.createElement('li'))
       monsterDescLi.setAttribute('class', 'monster-description-li')
       monsterDescLi.innerHTML = "<strong>Description: </strong>"+monsterDescription
    }
    console.log(data)
    console.log(monster)
})



})