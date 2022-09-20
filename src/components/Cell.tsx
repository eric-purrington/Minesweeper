import React, { FunctionComponent } from "react"
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { CellProps } from "../types"

const Cell: FunctionComponent<CellProps>  = ({
  cell,
  value,
  isMine,
  isRevealed,
  revealCells,
  gameEnded,
}) => {

  const getValueColor = (value) => {
    switch (value) {
      case 1:
        return 'rgb(0, 0, 255)'
      case 2:
        return 'rgb(0, 128, 0)'
      case 3:
        return 'rgb(255, 165, 0)'
      case 4:
        return 'rgb(128, 0, 128)'
      case 5:
        return 'rgb(128, 0, 0)'
      case 6:
        return 'rgb(0, 255, 255)'
      case 7:
        return 'rgb(0, 0, 0)'
      case 8:
        return 'rgb(128, 128, 128)'
      default:
        return 'rgb(0, 0, 0)'
    }
  }

  const getBackgroundColor = () => {
    let oddRowEvenCol = cell.cPos % 2 == 0 && cell.rPos % 2 != 0
    let evenRowOddCol = cell.cPos % 2 != 0 && cell.rPos % 2 == 0
    let opacity = oddRowEvenCol || evenRowOddCol ? 0.5 : 0.8
    if (isRevealed) {
      return cell.isMine ? 'rgba(128, 0, 0, 0.8)' : `rgba(76, 43, 21, ${opacity})`
    } else {
      return `rgba(0, 128, 0, ${opacity})`
    }
  }

  // only non mines have values so show value if not mine and if value is 0 show empty box
  const valueRevealed = () => {
    if (isMine && isRevealed) return <Text>💣</Text>
    if (value && isRevealed) return (
      <Text style={{...styles.value, color: getValueColor(value)}}>
        {value}
      </Text>
    )
    return <View />
  }

  return (
    <TouchableOpacity
      activeOpacity={!isRevealed && !gameEnded ? 0.5 : 1}
      style={{...styles.container, backgroundColor: getBackgroundColor()}}
      onPress={() => !isRevealed && !gameEnded ? revealCells(cell) : null}
    >
      {valueRevealed()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontWeight: '700',
    fontSize: 18,
  },
})

export default Cell