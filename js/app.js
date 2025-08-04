const container = document.querySelector("#champ-cont")

const url = "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json"

async function getData() {
   let res = await fetch(url)
   if (res.ok == false) {
    console.error(`The api is down. status code: ${res.status}`)
   }
   let data = await res.json()
    console.log(res)
    
   return data.data
}

async function builder() {
    
    let champions = await getData()
    for(let champ in champions) {
        const div = document.createElement("div")
        const nameOfChamp = document.createElement("h3")
        const nameTxt = document.createTextNode(champions[champ].name)
        const imgOfChamp = document.createElement("img")
        imgOfChamp.src = `./img/champion/${champions[champ].image.full}`
        const blurbTxt = document.createElement("p")
        const blurbInfo = document.createTextNode(champions[champ].blurb)

        blurbTxt.append(blurbInfo)
        nameOfChamp.append(nameTxt)
        div.appendChild(nameOfChamp)
        div.appendChild(imgOfChamp)
        div.appendChild(blurbTxt)
        container.appendChild(div)
    }
}

builder()
