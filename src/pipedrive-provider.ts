/* Copyright © 2022 Seneca Project Contributors, MIT License. */

const Pkg = require("../package.json")

const Pipedrive = require("Pipedrive-api")

type PipedriveProviderOptions = {}

function PipedriveProvider(this: any, options: PipedriveProviderOptions) {
  const seneca: any = this

  const entityBuilder = this.export("provider/entityBuilder")

  seneca.message("sys:provider,provider:pipedrive,get:info", get_info)

  async function get_info(this: any, _msg: any) {
    return {
      ok: true,
      name: "pipedrive",
      version: Pkg.version,
      sdk: {
        name: "pipedrive",
        version: Pkg.dependencies["pipedrive-api"],
      },
    }
  }

  entityBuilder(this, {
    provider: {
      name: "pipedrive",
    },
    entity: {
      site: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {
              let res = await this.shared.sdk.sites()
              let list = res.map((data: any) => entsize(data))
              return list
            },
          },

          load: {
            action: async function (this: any, entize: any, msg: any) {
              let q = msg.q || {}
              let id = q.id

              try {
                let res = await this.shared.sdk.site({ siteId: id })
                return entize(res)
              } catch (e: any) {
                if (e.message.includes("invalid id")) {
                  return null
                } else {
                  throw e
                }
              }
            },
          },
        },
      },

      collection: {
        cmd: {
          list: {
            action: async function (this: any, entize: any, msg: any) {
              let q = msg.q || {}
              let id = q.id

              try {
                let preres = await this.shared.sdk.site({ siteId: id })
                let res = await preres.collections()
                return res
              } catch (e: any) {
                if (e.message.includes("invalid id")) {
                  return null
                } else {
                  throw e
                }
              }
            },
          },

          load: {
            action: async function (this: any, entize: any, msg: any) {
              let q = msg.q || {}
              let siteId = q.siteId
              let collectionId = q.collectionId

              try {
                let preres = await this.shared.sdk.site({ siteId: siteId })
                let res = await preres.collection({
                  collectionId: collectionId,
                })
                return entize(res)
              } catch (e: any) {
                if (e.message.includes("invalid id")) {
                  return null
                } else {
                  throw e
                }
              }
            },
          },
        },
      },

      item: {
        cmd: {
          list: {
            action: async function (this: any, entsize: any, msg: any) {
              let q = msg.q || {}
              let id = q.id

              try {
                let preres = await this.shared.sdk.collection({
                  collectionId: id,
                })
                let res = await preres.items()
                return res
              } catch (e: any) {
                if (e.message.includes("invalid id")) {
                  return null
                } else {
                  throw e
                }
              }
            },
          },

          load: {
            action: async function (this: any, entsize: any, msg: any) {
              let q = msg.q || {}
              let collectionId = q.collectionId
              let itemId = q.itemId

              try {
                let preres = await this.shared.sdk.collection({
                  collectionId: collectionId,
                })
                let res = await preres.item({ itemId: itemId })
                return entsize(res)
              } catch (e: any) {
                if (e.message.includes("invalid id")) {
                  return null
                } else {
                  throw e
                }
              }
            },
          },
        },
      },
    },
  })

  seneca.prepare(async function (this: any) {
    let res = await this.post(
      "sys:provider,get:keymap,provider:pipedrive,key:accesstoken"
    )

    let token = res.keymap.accesstoken.value

    this.shared.sdk = new Pipedrive({ token })
  })

  return {
    exports: {
      sdk: () => this.shared.sdk,
    },
  }
}

// Default options.
const defaults: PipedriveProviderOptions = {
  // TODO: Enable debug logging
  debug: false,
}

Object.assign(PipedriveProvider, { defaults })

export default PipedriveProvider
