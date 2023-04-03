/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: 2023-03-10
 * Author:Haniehsadat Gholamhosseini
 *
 */
// const pathProcessed = path.join(__dirname, "grayscaled");
// const zipFilePath = path.join(__dirname, "myfile.zip");
// const pathUnzipped = path.join(__dirname, "unzipped");

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

// const { unzipper } = require("zlib")
// const unzipStream = zlib.createGunzip();

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (zipFilePath, pathOut) => {
  // return new Promise((res, rej)=> {
    return fs.createReadStream(zipFilePath)
    // if (err){
    //   rej(err)
    // }
    // else{
      // pipe(unzipper.Parse())
      .pipe(unzipper.Extract({ path: pathOut}))
      .promise()
    }

pictures = (directories) => {
  return new Promise((res, rej) => {
    for (const file of directories){
      if (path.extname(file) == ".png"){
        fs.appendFile(pathUnzipped, file,(err) => {
          if (err){
            rej(err)
          }
        });
      }
    }
    res("Extraction operation complete")
  }) 
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (pathUnzipped) => {
  let paths = []
  return new Promise((res, rej)=> {
    fs.readdir(pathUnzipped, (err, data)=> {
      if (err){
        rej(err)
      }
      else{
        for(const file of data){
          if ( file == "__MACOSX"){
            continue
          }else {
            paths.push(path.join(pathUnzipped, file))
          }
        }
      }
      res(paths)
    })
  })
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathUnzipped, pathProcessed) => {
  return new Promise(()=> {
    fs.createReadStream(pathUnzipped)
  .pipe(
    new PNG({
      
    })
  )
  .on("parsed", function () {
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;

        // invert color
        let Gray= ((this.data[idx]) + (this.data[idx + 1]) + (this.data[idx + 2]))/3
        this.data[idx] = Gray;
        this.data[idx + 1] = Gray;
        this.data[idx + 2] = Gray;
      }
    }
    let cutted = pathUnzipped.split("\\")
    let filename = cutted.slice(-1).pop();
    this.pack().pipe(fs.createWriteStream(path.join(pathProcessed , "grayscaled" + filename)));
  });
  })
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
