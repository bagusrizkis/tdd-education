# Demo

- [x] Install depedency testing dan setup script
- [x] Buat Testing Sample dari doc
- [x] Testing Server

  - setup untuk testing

  - https://jestjs.io/
  - https://www.npmjs.com/package/supertest (API testing)
  - konfigurasi script:
    ```json
    "setup:dev": "sequelize-cli db:drop&&sequelize-cli db:create&&sequelize-cli db:migrate ",
    "setup:test": "set NODE_ENV=test&& sequelize-cli db:drop&&sequelize-cli db:create && sequelize-cli db:migrate",
    "test": "set NODE_ENV=test&&jest --runInBand --forceExit --detectOpenHandles",
    "dev": "set NODE_ENV=development&&nodemon ./bin/server.js",
    "start": "set NODE_ENV=production&&node ./bin/server.js"
    ```

- [x] User (Register dan Login)

  - matchers (https://jestjs.io/docs/expect)
  - Positif Case & Negative Case (deskripsi test harus jelas)

- [x] Setup dan Teardown

  - mulai clean
  - done clean
