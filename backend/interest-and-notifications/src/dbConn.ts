import { connect, Error } from "mongoose"

export default () => {
    connect('mongodb+srv://jboree:r4RNVO5nBdzZ993C@cluster0.xueajwo.mongodb.net/?retryWrites=true&w=majority', {
        dbName: 'jdb'
    })
    .then(():void => console.log("MS connected to DB"))
    .catch((e: Error):void => {
        console.error(e.message)
        process.exit(1)
    })
}