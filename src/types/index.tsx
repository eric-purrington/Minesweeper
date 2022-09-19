export interface CellProps {
  cell: CellObjProps
  value?: number
  isMine?: boolean
  isRevealed?: boolean
  revealCells: (arg1) => void
}

export interface BoardProps {
  numOfRows: number
  numOfCols: number
  numOfMines: number
  handleGameEnd: (arg0) => void
}

export interface CellObjProps {
  rPos: number
  cPos: number
  isRevealed?: boolean
  value?: number
  isMine?: boolean
}