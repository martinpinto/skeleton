/**
 * Exports DB configuration.
 * @type {{url: string}} url for DB
 */
module.exports = {
    url: "mongodb://wedding_user:333mpb77@localhost:27017/weddingSite",
    urlprod: process.env.OPENSHIFT_MONGODB_DB_URL + "weddingSite"
};