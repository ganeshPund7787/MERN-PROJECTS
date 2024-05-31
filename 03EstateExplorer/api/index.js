import express from "express";

const app = express();


app.listen(3000, () => {
    console.log(`The port is running on 3000 !`)
});


// mv .git ../ => for move repository to parent folder