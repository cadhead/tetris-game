const tetrominoesCollection = [
  {
    type: 'I',
    color: '#9932CC',
    matrix: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
  },
  {
    type: 'J',
    color: '#87CEEB',
    matrix: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0]
    ]
  },
  {
    type: 'L',
    color: '#4169E1',
    matrix: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0]
    ]
  },
  {
    type: 'O',
    color: '#F0E68C',
    matrix: [
      [0, 0, 0, 0],
      [0, 4, 4, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    type: 'S',
    color: '#DC143C',
    matrix: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0]
    ],
  },
  {
    type: 'T',
    color: '#FF6347',
    matrix: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0]
    ],
  },
  {
    type: 'Z',
    color: '#228B22',
    matrix: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0]
    ],
  }
];

export default tetrominoesCollection;
