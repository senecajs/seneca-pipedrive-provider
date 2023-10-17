const Pipedrive = require("pipedrive-api")
const token = require("./local-env").PIPEDRIVE_ACCESSTOKEN

run()

async function run() {
  // initialize the client with the access token
  const pipedrive = new pipedrive({ token })

  const col = await pipedrive.collection({
    collectionId: "",
  })
  const colItems = await col.items()
  console.log(colItems)
}
