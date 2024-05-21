module.exports = {
    port : process.env.port || 3001 ,
    db :  process.env.Mongodb || "mongodb://127.0.0.1/bd",
    SECRET_TOKEN:'miclavedetoken'
}