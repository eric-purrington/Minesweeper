import React, { FunctionComponent } from "react"
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { CellProps } from "../types"

const Cell: FunctionComponent<CellProps>  = ({
  cell,
  value,
  isMine,
  isRevealed,
  revealCells,
}) => {

  // only non mines have values so show value if not mine and if value is 0 show empty box
  const valueRevealed = () => {
    if (isMine && isRevealed) return <MineSvg />
    if (value && isRevealed) return <Text>{value}</Text>
    return <View />
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => !isRevealed ? revealCells(cell) : null}
    >
      {valueRevealed()}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  }
})

export default Cell