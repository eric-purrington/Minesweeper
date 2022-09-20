import React, {FunctionComponent, useState, useEffect} from "react"
import { StyleSheet, View } from "react-native"
import { BoardProps, CellObjProps } from "../types"
import Cell from "./Cell"

const GameBoard: FunctionComponent<BoardProps>  = ({
  numOfRows,
  numOfCols,
  numOfMines,
  handleGameEnd,
  gameEnded,
}) => {
  const [grid, setGrid] = useState<CellObjProps[][]>()

  useEffect(() => {
    !grid && setGrid(createGridArray())
  }, [grid])

  const createGridArray = () => {
    // loop through number of rows to create an array of arrays of objects
    let gridArray: CellObjProps[][] = []
    for (let r = 0; r < numOfRows; r++) {
      gridArray[r] = []
      for (let c = 0; c < numOfCols; c++) {
        let newCell = {
          rPos: r,
          cPos: c,
        }
        gridArray[r].push(newCell)
      }
    }

    // add isMine field to grid cells based on numOfMines prop
    let minesAdded = 0
    while (minesAdded < numOfMines) {
      let rowIndex = Math.floor(Math.random() * numOfRows)
      let colIndex = Math.floor(Math.random() * numOfCols)

      let cell = gridArray[rowIndex][colIndex]
      if (!cell.isMine) {
        cell.isMine = true
        minesAdded++
      }
    }

    // assign values based on number of mines adj
    for (let r = 0; r < numOfRows; r++) {
      for (let c = 0; c < numOfCols; c++) {
        if (!gridArray[r][c].isMine) {
          let mineCount: number = 0
          let adjCells: CellObjProps[] = getAdjCells(r, c, gridArray)
          adjCells.forEach(cell => {
            cell.isMine ? mineCount++ : null
          })
          gridArray[r][c].value = mineCount
        }
      }
    }

    return gridArray
  }

  const getAdjCells = (row: number, col: number, gridArray?: CellObjProps[][]) => {
    // handle rows and cols that don't have adjCells on certain sides
    let rowStart = row > 0 ? -1 : 0
    let rowEnd = row < numOfRows - 1 ? 1 : 0
    let colStart = col > 0 ? -1 : 0
    let colEnd = col < numOfCols - 1 ? 1 : 0
    let localGrid = gridArray ? gridArray : grid
    let adjCells: CellObjProps[] = []
    for (let rPos = rowStart; rPos <= rowEnd; rPos++) {
      for (let cPos = colStart; cPos <= colEnd; cPos++) {
        adjCells.push(localGrid[row + rPos][col + cPos])
      }
    }
    return adjCells
  }

  const revealCells = (cell: CellObjProps) => {
    let row = cell.rPos
    let col = cell.cPos

    if (cell.isRevealed || gameEnded) return

    // map over state with new isRevealed value
    let localGrid = [...grid]
    localGrid[row][col].isRevealed = true
    setGrid(localGrid)

    // end game if isMine
    if (cell.isMine) {
      revealMines()
      handleGameEnd(false)
      return
    }

    // end game if num of unrevealed cells is 0 or unrevealed mines equals num of unrevealed cells
    let unrevealedNonMines = 0
    localGrid?.forEach(localRow => {
      localRow.forEach((localCell: CellObjProps) => {
        if (localCell.isRevealed) return
        if (!localCell.isMine) unrevealedNonMines++
      })
    })
    if (unrevealedNonMines === 0) handleGameEnd(true)

    // recursively reveal cells until no more touching adj 0s
    if (cell.value === 0) {
      const adjCells = getAdjCells(row, col, undefined)
      for (let i = 0; i < adjCells.length; i++) {
        revealCells(adjCells[i])
      }
    }
  }

  const revealMines = () => {
    let localGrid = [...grid]
    localGrid?.forEach(row => {
      row.forEach((cell: CellObjProps) => {
        if (cell.isMine) localGrid[cell.rPos][cell.cPos].isRevealed = true
      })
    })
    setGrid(localGrid)
  }

  return (
    <View style={styles.container}>
      {grid?.map((row, index) => {
        return (
          <View style={styles.row} key={index}>
            {grid?.[index]?.map((cell: CellObjProps) => {
              return (
                <Cell
                  key={`${cell.rPos}_${cell.cPos}`}
                  cell={grid[index][cell.cPos]}
                  value={cell.value}
                  isMine={cell.isMine}
                  isRevealed={cell.isRevealed}
                  revealCells={revealCells}
                  gameEnded={gameEnded}
                />
              )
            })}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
})

export default GameBoard