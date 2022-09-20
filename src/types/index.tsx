export interface CellProps {
  cell: CellObjProps
  value?: number
  isMine?: boolean
  isRevealed?: boolean
  revealCells: (arg0: CellObjProps) => void
  gameEnded: boolean
}

export interface BoardProps {
  numOfRows: number
  numOfCols: number
  numOfMines: number
  handleGameEnd: (arg0: boolean) => void
  gameEnded: boolean
}

export interface CellObjProps {
  rPos: number
  cPos: number
  isRevealed?: boolean
  value?: number
  isMine?: boolean
}

export interface InputRowProps {
  label: string
  value: string
  onChange: (arg0: string) => void
}