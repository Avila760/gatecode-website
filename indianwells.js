const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible = user.CommunityName.toLowerCase().includes(value) || user.City.toLowerCase().includes(value)
        /*|| user.GateCode.toLowerCase().includes(value)*/
        user.element.classList.toggle("hide", !isVisible)
    })
})        

fetch("https://script.google.com/macros/s/AKfycbySjB2ONbzVr5YuYOe6qJPfl3xttkIg09PcgOUDtxL58eMeZurY0FY3yUqUoQy558YWdg/exec")
   .then(res => res.json())
   .then(data => {
      users = data.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        const body2 = card.querySelector("[data-body2]")
        header.textContent = user.CommunityName
        body.textContent = user.GateCode
        body2.textContent = user.City
        userCardContainer.append(card)
        return { CommunityName: user.CommunityName, GateCode: user.GateCode, City: user.City, element: card } 
      })
   })