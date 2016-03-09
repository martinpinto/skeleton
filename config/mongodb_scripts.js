/**
 * These scripts are used to include new data into DB
 */
use defaultDB;

db.createUser({ user: "default_user",
   pwd: "333mpb77",
   roles: [ { role: "dbOwner", db: "defaultDB" } ]
});