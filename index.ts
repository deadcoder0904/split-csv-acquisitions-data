const fs = require('fs')
const fastcsv = require('fast-csv')
const neatCsv = require('neat-csv')

import { Acquisition, Acquisition2, Object } from './types'

const resultsCSV: Array<
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
    ({ parent_company: string } | { acquired_by: string })
> = []
const acquisitionsCSV = []

const writeResultsCSV = (csv: typeof resultsCSV) => {
  fastcsv
    .write(resultsCSV, { headers: true })
    .pipe(fs.createWriteStream('./output/acquisitions.csv')) // create `output` folder manually
}

const firstRun = async () => {
  const acquisitions: Acquisition[] = await neatCsv(
    fs.createReadStream('./acquisitions-data/kaggle/acquisitions.csv')
  )
  const objects: Object[] = await neatCsv(
    fs.createReadStream('./acquisitions-data/kaggle/objects.csv')
  )

  for (let object of objects) {
    for (let acquisition of acquisitions) {
      if (object.id === acquisition.acquiring_object_id) {
        const data = {
          id: object.id,
          parent_company: object.name,
          acquired_object_id: acquisition.acquired_object_id,
          price_amount: acquisition.price_amount,
          price_currency_code: acquisition.price_currency_code,
          acquired_at: acquisition.acquired_at,
          source_url: acquisition.source_url,
          source_description: acquisition.source_description,
        }
        resultsCSV.push(data)
      }
    }
  }

  writeResultsCSV(resultsCSV)
}

const secondRun = async () => {
  const acquisitions: Acquisition2[] = await neatCsv(
    fs.createReadStream('./output/acquisitions.csv')
  )
  const objects: Object[] = await neatCsv(
    fs.createReadStream('./acquisitions-data/kaggle/objects.csv')
  )
  for (let object of objects) {
    for (let acquisition of acquisitions) {
      if (object.id === acquisition.acquired_object_id) {
        const data = {
          parent_company: acquisition.parent_company,
          acquired_startup: object.name,
          price_amount: acquisition.price_amount,
          price_currency_code: acquisition.price_currency_code,
          acquired_at: acquisition.acquired_at,
          source_url: acquisition.source_url,
          source_description: acquisition.source_description,
        }
        resultsCSV.push(data)
      }
    }
  }

  writeResultsCSV(resultsCSV)
}

const main = () => {
  // firstRun()
  secondRun()
}

main()
