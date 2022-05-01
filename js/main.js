import {data} from "./data.js"

const imported = document.getElementById('imported')
const fetched = document.getElementById('fetched')

imported.textContent = data.join(" ")

document.addEventListener('click', async () => {
  const data = await fetch("../mockData/statuses.json").then(res => res.json()).catch(() => "Couldn't load data")
  console.log(data)

  if (typeof data === "string") return fetched.textContent = data

  fetched.textContent = data.map(({text}) => text).join(" ")
})