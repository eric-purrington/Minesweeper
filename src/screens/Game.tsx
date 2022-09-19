import React, {useState, useEffect} from "react";
import { StyleSheet, View } from "react-native";
import GameBoard from "../components/GameBoard";

const Game = () => {
  const [numOfRows, setNumOfRows] = useState(10)
  const [numOfCols, setNumOfCols] = useState(10)
  const [numOfMines, setNumOfMines] = useState(10)

  const handleGameEnd = (phrase) => {

  }

  return (
    <View style={styles.container}>
      <GameBoard
        handleGameEnd={handleGameEnd}
        numOfRows={numOfRows}
        numOfCols={numOfCols}
        numOfMines={numOfMines}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Game;
