const fs = require('fs')
const fastcsv = require('fast-csv')
const neatCsv = require('neat-csv')

const objectsCSV = []
const acquisitionsCSV = []

const main = async () => {
  const acquisitions = await neatCsv(
    fs.createReadStream('./acquisitions-data/kaggle/acquisitions.csv')
  )
  const objects = await neatCsv(
    fs.createReadStream('./acquisitions-data/kaggle/objects.csv')
  )

  // const acquisitions2 = await neatCsv(
  //   fs.createReadStream('./output/acquisitions.csv')
  // )
  // const objects2 = await neatCsv(fs.createReadStream('./output/objects.csv'))

  // console.log(acquisitions.length)
  // console.log(objects.length)
  // console.log(acquisitions2.length)
  // console.log(objects2.length)

  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < acquisitions.length; j++) {
      if (
        objects[i].id === acquisitions[j].acquisition_id ||
        objects[i].id === acquisitions[j].acquired_object_id
      ) {
        objectsCSV.push(objects[i])
        acquisitionsCSV.push(acquisitions[j])
      }
    }
  }

  fastcsv
    .write(objectsCSV, { headers: true })
    .pipe(fs.createWriteStream('./output/objects.csv')) // create `output` folder manually

  fastcsv
    .write(objectsCSV, { headers: true })
    .pipe(fs.createWriteStream('./output/acquisitions.csv'))
}

main()
