const express = require('express');
const app = express ();
app.use(express.json());
const PORT = 3000
const host="192.168.43.37"
const path = require('path');


const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');


const adminRoites = require('./api/user/user.router')
const userRoites = require('./api/user/user.router')
const itemRoites = require('./api/item/item.router')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  fileUpload({
    createParentPath: true, // Optional: Automatically create directories if needed
    // limits: { fileSize: 5 * 1024 * 1024 }, // Optional: Set file size limits (e.g., 5MB)
  })
);

app.use('/uploads', express.static('uploads'));

app.use('/admin',adminRoites)
app.use('/user',userRoites)
app.use('/item',itemRoites)


app.listen(PORT,host, () => {
    console.log("Server Listening on PORT:", PORT);
  });
