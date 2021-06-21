document.addEventListener('DOMContentLoaded', function(){

fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
.then(resp => resp.json())
.then((data)=>{
    console.log(data)
})
const createMonsterDiv = document.getElementById('create-monster')
const monsterContainer = document.getElementById('monster-container')
const backButton = document.getElementById('back')
const forwardButton = document.getElementById('forward')


})