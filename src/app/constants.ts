enum DataType {
  RAW = 'RAW',
  NORMALIZED = 'NORMALIZED'
}

export const DATA_TYPE_OPTIONS = [
  { label: 'Raw', value: DataType.RAW },
  { label: 'Normalized', value: DataType.NORMALIZED },
];

export const DATE_RANGE_INDEX = {
  'START': 0,
  'END': 1
}