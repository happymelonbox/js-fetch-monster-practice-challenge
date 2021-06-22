document.addEventListener('DOMContentLoaded', function(){
    const monsterContainerUl = document.getElementById('monster-container-ul')
    const backButton = document.getElementById('back')
    const forwardButton = document.getElementById('forward')
    const monsterForm = document.getElementById('monster-form')
    const URL = 'http://localhost:3000/monsters/?_limit=50&_page='
    const UrlAllMonsters = 'http://localhost:3000/monsters/'

    let pageNumber = 1
    let totalMonsters
    let totalPages
    let createMonsterName
    let createMonsterAge
    let createMonsterDescription
    let displayedPage = document.getElementById('pageNumber')

    howManyPages()
    fetchData(pageNumber)
    displayedPage.innerHTML = pageNumber

    backButton.addEventListener('click', pageBack())
    forwardButton.addEventListener('click', pageForward())
    monsterForm.addEventListener('submit', function(e){
        e.preventDefault()
        createMonster()
    })

    function fetchData(page){
    fetch(`${URL}${page}`)
    .then(resp => resp.json())
    .then(data=> displayMonster(data))
    }
    function createMonster(){
        createMonsterName = document.getElementById('inputName').value
        createMonsterAge = document.getElementById('inputAge').value
        createMonsterDescription = document.getElementById('inputDescription').value
        fetch(UrlAllMonsters)
        .then((resp)=>resp.json())
        .then((data)=>{
            if (Object.values(data).includes(`${createMonsterName}`) && Object.values(data).includes(`${createMonsterAge}`) && Object.values(data).includes(`${createMonsterDescription}`)){
                console.log('Object exists')
            } else {
                fetch(`${UrlAllMonsters}`, {
                    method: 'POST',
                    headers: {
                     'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'name': `${createMonsterName}`,
                        'age': `${createMonsterAge}`,
                        'description': `${createMonsterDescription}`
                    })
                })
                .then((resp)=>resp.json())
                .then((data)=>{
                let created = document.getElementById('created')
                created.innerHTML = `Monster '${data.name}' has been added`
                })
            }
        })
    }
    function displayMonster(obj){
    const monsters = Object.values(obj)
    let monster, mCListItem, monsterName, monsterDetails, monsterAge, monsterDescription
    let mCList = monsterContainerUl.appendChild(document.createElement('li'))
    let currentlyDisplayed = document.querySelectorAll('li.displayedMonsters')
    for (i=0;i<currentlyDisplayed.length;i++){
        currentlyDisplayed[i].remove()
    }
    for(let i=0; i<monsters.length; i++){
       monster = monsters[i]
       monsterName = monster.name
       monsterAge = parseInt(monster.age)
       monsterDescription = monster.description
       mCList.setAttribute('class', 'displayedMonsters')
       mCListItem = mCList.appendChild(document.createElement('li'))
       mCListItem.innerHTML = monsterName
       mCListItem.setAttribute('id', monsterName)
       monsterDetails = mCListItem.appendChild(document.createElement('ul'))
       monsterDetails.setAttribute('class', 'monster-info')
       monsterAgeLi = monsterDetails.appendChild(document.createElement('li'))
       monsterAgeLi.setAttribute('class', 'monster-age-li')
       monsterAgeLi.innerHTML = "<strong>Age: </strong>"+monsterAge+' years old'
       monsterDescLi = monsterDetails.appendChild(document.createElement('li'))
       monsterDescLi.setAttribute('class', 'monster-description-li')
       monsterDescLi.innerHTML = "<strong>Description: </strong>"+monsterDescription
    }
    }
    function howManyPages(){
        fetch(UrlAllMonsters)
        .then(resp => resp.json())
        .then((json)=>{
            totalMonsters = json.length
            totalPages = totalMonsters/50
        })
    }
    function pageForward(){
        if(pageNumber <= totalPages){
        pageNumber = (pageNumber + 1)
        fetchData(pageNumber)
        displayedPage.innerHTML = pageNumber
    }}
    function pageBack(){
        if(pageNumber > 0){
        pageNumber = pageNumber - 1
        fetchData(pageNumber)
        displayedPage.innerHTML = pageNumber
        }
    }
})
