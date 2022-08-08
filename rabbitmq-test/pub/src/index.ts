import app from "./publisher"

const start = async () => {
    app.listen(8085, () => console.log(`Transaction Server is running 8085`));
}

start();