const connection = require('./../../config/database')
const stringfile = require('./../../config/stringfile')
const commonfunction = require('../../config/commonfunction')
const path = require('path');
const fs = require('fs');
const mm = require('music-metadata');


async function getSongDuration(filePath, callback) {
  try {
    // console.log(mm);
    // Read metadata from the file
    const metadata = await mm.parseFile(filePath);
    const duration = metadata.format.duration; // Duration in seconds
    console.log(`Duration: ${duration} seconds`);
    // return duration;
    callback(duration)
  } catch (err) {
    callback()
    console.error(`Error reading metadata: ${err.message}`);
  }
}

module.exports = {

  additem: async (req, callback) => {

    try {
      var data = req.body; // Extract other 



      // Validate if file is uploaded
      if (!data.itemname || !data.category || !data.storename || !data.purchaseprice || !data.weight || !data.userid || !data.karat) {
        callback(stringfile.enteralldata)
      } else if (!req.files || !req.files.image) {
        callback(stringfile.nofileupload)
      } else {

        const image = req.files.image;

        // Validate file type heif / .heic
        const allowedExtensions = /png|jpeg|jpg|heif|.heic/;
        const extname = allowedExtensions.test(
          path.extname(image.name).toLowerCase()
        );
        const mimetype = allowedExtensions.test(image.mimetype);

        if (!extname || !mimetype) {

          callback(stringfile.filetypeerror)
        } else {



          // Create upload directory if it doesn't exist
          const uploadPath = path.join(__dirname, '../../uploads/item');
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
          }
          var imgname = `${Date.now()}_${image.name}`
          const filePath = path.join(uploadPath, imgname);
          await image.mv(filePath);
          var uuid = commonfunction.generateUniqueID()
          connection.query(`insert into item(itemid,karat,name,category,storename,purchaseprice,note,weight,image,userid,purchasecurrency) values (?,?,?,?,?,?,?,?,?,?,?)`
            , [
              uuid,
              data.karat,
              data.itemname,
              data.category,
              data.storename,
              data.purchaseprice,
              data.note,
              data.weight,

              imgname,
              data.userid,
              data.purchasecurrency,
            ], (err, result) => {
              if (err) {
                console.log(err)
                callback(err)
              } else {
                data.itemid = uuid
                data.userid = undefined

                callback(null, [data])
              }
            })
        }
      }
    } catch (error) {
      console.log(error)
      callback(error)
    }


  },

  updateitem: async (req, callback) => {

    try {
      var data = req.body; // Extract other 




      // Validate if file is uploaded
      if (!data.itemname || !data.category || !data.storename || !data.purchaseprice || !data.weight || !data.userid || !data.itemid || !data.karat) {
        callback(stringfile.enteralldata)
      } else if (req.files) {
        const image = req.files.image;

        // Validate file type heif / .heic
        const allowedExtensions = /png|jpeg|jpg|heif|.heic/;
        const extname = allowedExtensions.test(
          path.extname(image.name).toLowerCase()
        );
        const mimetype = allowedExtensions.test(image.mimetype);

        if (!extname || !mimetype) {

          callback(stringfile.filetypeerror)
        } else {



          // Create upload directory if it doesn't exist
          const uploadPath = path.join(__dirname, '../../uploads/item');
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
          }
          var imagename = `${Date.now()}_${image.name}`
          const filePath = path.join(uploadPath, imagename);
          await image.mv(filePath);

          connection.query(`update item set name=?,category=?,storename=?,purchaseprice=?,note=?,weight=?,image=?,purchasecurrency=?,karat=? where itemid=?`
            , [

              data.itemname,
              data.category,
              data.storename,
              data.purchaseprice,
              data.note,
              data.weight,

              imagename,

              data.purchasecurrency,
              data.karat,
              data.itemid
            ], (err, result) => {
              if (err) {
                console.log(err)
                callback(err)
              } else {

                data.userid = undefined

                callback(null, [data])
              }
            })
        }
      } else {
        connection.query(`update item set name=?,category=?,storename=?,purchaseprice=?,note=?,weight=?,image=?,purchasecurrency=?,karat=?  where itemid=?`
          , [

            data.itemname,
            data.category,
            data.storename,
            data.purchaseprice,
            data.note,
            data.weight,
            data.image,
            data.purchasecurrency,
            data.karat,
            data.itemid
          ], (err, result) => {
            if (err) {
              console.log(err)
              callback(err)
            } else {

              data.image = undefined
              data.userid = undefined

              callback(null, [data])
            }
          })

      }
    } catch (error) {
      console.log(error)
      callback(error)
    }


  },

  getitem: async (data, callback) => {
    if (!data.userid) {
      callback(stringfile.enteralldata)
    } else {


      connection.query(`select currency from user where userid='${data.userid}' and isactive=1`, (err, result) => {
        if (err) {
          callback(err)
        } else {
          if (result.length > 0) {
            // callback(null,, result)
            connection.query(`select itemid,name,category,storename,purchaseprice,note,weight,image,purchasecurrency,karat from item where userid ='${data.userid}' and isactive=1`, (err, result) => {
              if (err) {
                callback(err)
              } else {
                try {
                  result.map((i) => {
                    i.image = stringfile.baseurl + 'uploads/item/' + i.image
                  })
                  callback(null, result)
                } catch (error) {
                  callback(null, [])
                }
              }
            })
          } else {
            callback(stringfile.usernotfound)
          }
        }
      })
    }
  },

  deleteitem: async (data, callback) => {
    if (!data.itemid) {
      callback(stringfile.enteralldata)
    } else {


      connection.query(`update item set isactive=0 where itemid='${data.itemid}'`, (error, result) => {
        if (error) {
          callback(error)
        } else {
          callback(null, [])
        }
      })
    }
  },

  uploadimage: async (req, callback) => {

    try {
      var data = req.body; // Extract other 
      // Validate if file is uploaded
      if (!req.files || !req.files.image) {
        callback(stringfile.nofileupload)
      } else {

        const image = req.files.image;
        const fileSizeInMB = image.size / (1024 * 1024);
        if (fileSizeInMB < 1) {
          callback('File must be at least 1 MB.');
        }
        // Validate file type heif / .heic
        const allowedExtensions = /png|jpeg|jpg|heif|.heic/;
        const extname = allowedExtensions.test(
          path.extname(image.name).toLowerCase()
        );
        const mimetype = allowedExtensions.test(image.mimetype);
        if (!extname || !mimetype) {
          callback(stringfile.filetypeerror)
        } else {
          // Create upload directory if it doesn't exist
          const uploadPath = path.join(__dirname, '../../uploads/item');
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
          }
          var imgname = `${Date.now()}_${image.name}`
          const filePath = path.join(uploadPath, imgname);
          await image.mv(filePath);
          var uuid = commonfunction.generateUniqueID()

        }
      }
    } catch (error) {
      console.log(error)
      callback(error)
    }


  },
  uploadaudio: (req, callback) => {
    if (!req.files || !req.files.audioFile) {
      callback('No file uploaded.');
    } else {
      const audioFile = req.files.audioFile;
      const fileSizeInMB = audioFile.size / (1024 * 1024);
      // console.log(fileSizeInMB)
      if (fileSizeInMB < 0.1) {
        callback('File must be at least 1 MB.');
      } else {
          var songname = `${Date.now()}_${audioFile.name}`
        const uploadPath = path.join(__dirname, '../../uploads/item/' + songname);
        audioFile.mv(uploadPath, (err) => {
          if (err) {
            console.log(err)
            callback('Error while saving the file.');
          } else {
            // Check audio duration using ffmpeg
            getSongDuration(uploadPath, (duration) => {
              // console.log(duration)
              if (duration < 30) {
                fs.unlinkSync(uploadPath); // Remove temporary file
                callback('Audio file must be at least 30 seconds long.');
              } else {
                callback(null, [{songname:songname}])
              }
            });
          }
        });
      }

    }


  }


}