module.exports = {
     helptext: "Searches on the web. (doesn't work anymore)",
     getReply: async (_1, _2) => {
          return new Promise(async (mResolve) => {
               try {
                    mResolve("The web search feature is broken! and mub is too busy/lazy to fix it... rip...")
               } catch (e) {
                    console.log(e)
                    mResolve(null)
               }
          })
     }
}

