const container = document.querySelector("#champ-cont")

const url = "https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json"
let selectedChamp = ""
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
    for (let champ in champions) {
        const div = document.createElement("div")
        div.classList = "champCard"
        const nameOfChamp = document.createElement("h3")
        const nameTxt = document.createTextNode(champions[champ].name)
        const imgOfChamp = document.createElement("img")
        imgOfChamp.src = `/img/champion/${champions[champ].image.full}`
        const blurbTxt = document.createElement("p")
        const blurbInfo = document.createTextNode(champions[champ].blurb)
        const a = document.createElement("a")
        a.href = `#overhead-tranp`
        a.classList = "invis"
        blurbTxt.append(blurbInfo)
        nameOfChamp.append(nameTxt)
        div.appendChild(nameOfChamp)
        div.appendChild(imgOfChamp)
        div.appendChild(blurbTxt)
        a.appendChild(div)
        container.appendChild(a)
    }
    const cardsChamps = document.querySelectorAll(".champCard")

    cardsChamps.forEach(card => {
        card.addEventListener("click", () => {
            document.body.style.overflow = "hidden"
            selectedChamp = card.querySelector("h3").innerText
            champShowcase(selectedChamp)
        })
    })
}

builder()

const cardBG = document.querySelector("#overhead-tranp")
const cardFull = document.querySelector("#card")

async function champShowcase(champ) {
    let apicall = await getData()
    let rightchamp = apicall[champ]
    console.log(rightchamp)
    const img = document.createElement("img")
    img.src = `/img/champion/${rightchamp.image.full}`

    cardFull.appendChild(img)

}