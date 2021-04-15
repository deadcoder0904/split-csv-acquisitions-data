# split-csv-acquisitions-data

Use [csv_to_json](https://github.com/accidentalrebel/csv-to-json) to convert CSV to JSON for [QuickType](https://quicktype.io) to parse as QuickType doesn't support CSV type as an input. It, however, supports JSON.

### CSV to JSON

```bash
$ csv_to_json acquisitions-data/kaggle/acquisitions.csv -o acquisitions-data/kaggle/acquisitions.json
$ csv_to_json acquisitions-data/kaggle/objects.csv -o acquisitions-data/kaggle/objects.json
```

### JSON to TypeScript

```bash
$ quicktype acquisitions-data/kaggle/acquisitions.json acquisitions-data/kaggle/acquisitions.ts
$ quicktype acquisitions-data/kaggle/objects.json acquisitions-data/kaggle/objects.ts
```

```tsx
type Acquisitions = {
	acquiring: 'Instagram'
	acquired_by: 'Facebook',
	date_of_acquisition: 'May 20 2012',
	acquired_price: 1000000000
}
```

```json
startup_name => object.name,
```