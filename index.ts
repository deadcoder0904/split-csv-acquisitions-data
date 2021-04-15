const fs = require('fs')
const fastcsv = require('fast-csv')
const neatCsv = require('neat-csv')

import { Acquisition, Object } from './types'

const objectsCSV: Array<
  Pick<
    Acquisition,
    'id' &
      'acquired_object_id' &
      'price_amount' &
      'price_currency_code' &
      'acquired_at' &
      'source_url' &
      'source_description'
  > &
    ({ acquiring: string } | { acquired_by: string })
> = []
const acquisitionsCSV = []

const main = async () => {
  const acquisitions: Acquisition[] = await neatCsv(
    fs.createReadStream('./acquisitions-data/kaggle/acquisitions.csv')
  )
  const objects: Object[] = await neatCsv(
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

  // for (let i = 0; i < objects.length; i++) {
  //   if (i > 10) break
  //   for (let j = 0; j < acquisitions.length; j++) {
  //     if (j > 100) break
  //     if (j < 100) {
  //       console.log(`obj=${objects[i].id}=`)
  //       console.log(`acq=${acquisitions[j].acquiring_object_id}=`)
  //     }
  //     if (objects[i].id === acquisitions[j].acquiring_object_id) {
  //       console.log('in 💩')
  //       const data = {
  //         acquiring: objects[i].name,
  //         ...objects[i],
  //       }
  //       objectsCSV.push(data)
  //     }
  //   }
  // }

  // for (let i = 0; i < objects.length; i++) {
  //   if (i > 10) break
  //   for (let j = 0; j < acquisitions.length; j++) {
  //     if (j > 100) break
  //     if (objects[i].id === acquisitions[j].acquired_object_id) {
  //       const data = {
  //         acquired_by: objects[i].name,
  //         ...objects[i],
  //       }
  //       objectsCSV.push(data)
  //     }
  //   }
  // }

  for (let [i, obj] of objects.entries()) {
    for (let acq of acquisitions) {
      if (obj.id === acq.acquiring_object_id) {
        const data = {
          id: obj.id,
          acquiring: obj.name,
          acquired_object_id: acq.acquired_object_id,
          price_amount: acq.price_amount,
          price_currency_code: acq.price_currency_code,
          acquired_at: acq.acquired_at,
          source_url: acq.source_url,
          source_description: acq.source_description,
        }
        objectsCSV.push(data)
      }
      if (obj.id === acq.acquired_object_id) {
        const data = {
          id: obj.id,
          acquired_by: obj.name,
          acquired_object_id: acq.acquired_object_id,
          price_amount: acq.price_amount,
          price_currency_code: acq.price_currency_code,
          acquired_at: acq.acquired_at,
          source_url: acq.source_url,
          source_description: acq.source_description,
        }
        objectsCSV.push(data)
      }
    }
  }

  // for (let [i, obj] of objects.entries()) {
  //   for (let acq of acquisitions) {
  //     if (obj.id === acq.acquired_object_id) {
  //       // const data = {
  //       //   acquired_by: obj.name,
  //       //   ...obj,
  //       // }
  //       objectsCSV[i].acquired_by = obj.name
  //       // objectsCSV.push(data)
  //     }
  //   }
  // }

  fastcsv
    .write(objectsCSV, { headers: true })
    .pipe(fs.createWriteStream('./output/acquisitions.csv')) // create `output` folder manually
}

main()
