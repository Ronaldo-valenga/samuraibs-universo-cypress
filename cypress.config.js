const { defineConfig } = require("cypress");

const { Pool } = require('pg')

const pool = new Pool ({
  host: 'suleiman.db.elephantsql.com',
  user: 'hgdoqldr',
  password: '6NWkgrrHwcbkwTHSjnJGf9oQBJ-h1TJj',
  database: 'hgdoqldr',
  port: 5432
})

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        removeUser(email) {
          return new Promise(function(resolve, reject) {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result) {
              try {
                if (error) {
                  throw error
                }
                resolve({ success: result })
              } catch(e) {
                console.log(e)
                reject(e)
              }
            })
          })
        }
      })
    },
    baseUrl: "http://localhost:3000"
  }
});


