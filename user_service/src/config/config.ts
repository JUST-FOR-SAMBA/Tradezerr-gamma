const config = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            keepAlive: true,
            socketTimeoutMS: 30000,
            autoIndex: false,
            retryWrites: false
        },
        url: `mongodb+srv://tradezerr:Derickzr@cluster0.l0fny.mongodb.net/tradezerr?retryWrites=true&w=majority`
    },
    server: {
        host: 'localhost',
        port: 8080
    }
};

export {config}