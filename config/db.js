const mongoose = require("mongoose");

require("dotenv/config");

try {
    const uri = process.env.MONGO_URI;
    mongoose.connect(
        uri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => console.log('MongoDB conectado!'))
        .catch((err) => console.log('Erro ao conectar ao MongoDB: ', err));
} catch (err) {
    console.log(err);
}

mongoose.Promise = global.Promise;

module.exports = mongoose;
