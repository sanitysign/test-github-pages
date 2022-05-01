import { data } from "./data.js"

console.log(window.MockServiceWorker)
const { setupWorker, rest } = window.MockServiceWorker

const worker = setupWorker(
  rest.get("mocky", (req, res, ctx) => {
    console.log(req)
    console.log(ctx)

    return res(ctx.json(["some", "another"]))
  })
)
worker.start()

const imported = document.getElementById("imported")
const fetched = document.getElementById("fetched")
const intercepted = document.getElementById("intercepted")

imported.querySelector("[data-content]").textContent = data.join(" ")

fetched.addEventListener("click", async () => {
  const contentElem = fetched.querySelector("[data-content]")

  const data = await fetch("mockData/statuses.json")
    .then(res => res.json())
    .catch(() => "Couldn't load data")

  console.log(data)

  if (typeof data === "string") return (contentElem.textContent = data)

  contentElem.textContent = data.map(({ text }) => text).join(" ")
})

intercepted.addEventListener("click", async () => {
  const contentElem = intercepted.querySelector("[data-content]")

  const data = await fetch("mocky")
    .then(res => res.json())
    .catch(() => "Couldn't load data")

  console.log(data)

  if (typeof data === "string") return (contentElem.textContent = data)

  contentElem.textContent = data.join(" ")
})
