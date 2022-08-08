import Client from "amqplib/callback_api";
import express, { NextFunction, Request, Response } from "express";
import { json } from "body-parser";

const rabbit_host = process.env.RABBIT_HOST;
const rabbit_port = process.env.RABBIT_PORT;
const rabbit_user = process.env.RABBIT_USERNAME;
const rabbit_password = process.env.RABBIT_PASSWORD;

const app = express();
app.set("trust proxy", true)

app.use(json());


const publishEvent = (message: string) => {
    Client.connect("amqp://"+rabbit_user+":"+rabbit_password+"@"+rabbit_host+":"+rabbit_port+"/", (error0, connection)=> {
        if(error0){
            throw error0;
        }
        // create a channel

        connection.createChannel((error1, channel) => {
            if(error1){
                throw error1;
            }

            // make the queue available to the client

            const queue = "MyQueue";
            channel.assertQueue(queue, {
                durable: true
            })

            //Send a message to the queue
            channel.sendToQueue(queue, Buffer.from(message));


        })
        }
    );
}




app.post("/publish/:message", (req: Request, res: Response) => {
    const message: string = req.params.message;
    publishEvent(message)
    res.status(200).send({"message": "Hello  Derick"})
})
app.use((_, res) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

export default app;



