const Seneca = require("seneca")

Seneca({ legacy: false })
  .test()
  .use("promisify")
  .use("entity")
  .use("env", {
    // debug: true,
    file: [__dirname + "/local-env.js;?"],
    var: {
      $PIPEDRIVE_ACCESSTOKEN: String,
    },
  })
  .use("provider", {
    provider: {
      pipedrive: {
        keys: {
          accesstoken: { value: "$PIPEDRIVE_ACCESSTOKEN" },
        },
      },
    },
  })
  .use("../")
  .ready(async function () {
    const seneca = this

    console.log(await seneca.post("sys:provider,provider:pipedrive,get:info"))

    const list = await seneca.entity("provider/pipedrive/site").list$()
    console.log(list.slice(0, 3))
  })
const Seneca = require("seneca")
