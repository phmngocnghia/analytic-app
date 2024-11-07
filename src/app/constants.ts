export enum DataType {
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
export enum COLOR {
  GREEN = '#399918',
  RED = '#FF7777',
  GRID_BORDER = '#d6d6d6'
}