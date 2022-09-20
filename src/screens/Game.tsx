import React, { useRef, useState } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Linking } from "react-native"
import GameBoard from "../components/GameBoard"
import InputRow from "../components/InputRow"

const Game = () => {
  const [numOfRows, setNumOfRows] = useState(10)
  const [numOfCols, setNumOfCols] = useState(10)
  const [numOfMines, setNumOfMines] = useState(10)
  const [showSetup, setShowSetup] = useState(true)
  const [gameEnded, setGameEnded] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  const [time, setTime] = useState(0)

  const timer = useRef()

  const handleGameEnd = (won: boolean) => {
    clearTimeout(timer.current)
    setGameEnded(true)
    setStatus(won ? `🏆 in ${time} seconds!` : 'You Lost!')
  }

  const restoreDefaults = () => {
    setNumOfRows(10)
    setNumOfCols(10)
    setNumOfMines(10)
  }

  const startTimer = () => {
    clearTimeout(timer.current)
    timer.current = setInterval(() => setTime(time => time + 1), 1000)
  }

  const startGame = () => {
    let localError = ''
    if (numOfRows > 18 || numOfRows < 1) {
      localError = 'Number of rows not in allowed range: 1 - 18. '
    }
    if (numOfCols > 12 || numOfCols < 1) {
      localError += 'Number of columns not in allowed range: 1 - 12. '
    }
    if (numOfMines > numOfRows * numOfCols || numOfMines < 1) {
      localError += `Number of mines not in allowed range: 1 - ${numOfRows * numOfCols}.`
    }
    if (!localError) {
      setTime(0)
      setError('')
      setStatus('')
      setGameEnded(false)
      setShowSetup(false)
      startTimer()
    } else {
      setError(localError)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Minesweeper
      </Text>
      <View style={styles.subtitle}>
        <Text>
          Based on the classic 1989 game,{' '}
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL(
            'https://en.wikipedia.org/wiki/Minesweeper_(video_game)'
          )}
        >
          <Text style={styles.link}>
            Minesweeper 
          </Text>
        </TouchableOpacity>
      </View>

      {showSetup ?
        <View style={styles.setupCon}>
          <InputRow
            label={'# of Rows (max: 18)'}
            value={numOfRows.toString()}
            onChange={value => setNumOfRows(parseInt(value || '0'))}
          />
          <InputRow
            label={'# of Columns (max: 12)'}
            value={numOfCols.toString()}
            onChange={value => setNumOfCols(parseInt(value || '0'))}
          />
          <InputRow
            label={'# of Mines'}
            value={numOfMines.toString()}
            onChange={value => setNumOfMines(parseInt(value || '0'))}
          />
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={restoreDefaults}
            >
              <Text style={styles.buttonText}>
                Restore Defaults
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={startGame}
            >
              <Text style={styles.buttonText}>
                Start Game
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.error}>
            {error}
          </Text>
        </View>
      :
        <>
          <View style={{...styles.boardHeader, width: numOfCols * 30 - 2}}>
            <Text>
              {numOfMines} 💣
            </Text>
            <Text>
              {time} ⏲
            </Text>
          </View>
          <GameBoard
            handleGameEnd={handleGameEnd}
            numOfRows={numOfRows}
            numOfCols={numOfCols}
            numOfMines={numOfMines}
            gameEnded={gameEnded}
          />
          {gameEnded ?
            <Text style={styles.status}>
              {status}
            </Text>
          : null}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowSetup(true)}
          >
            <Text style={styles.buttonText}>
              Setup New Game
            </Text>
          </TouchableOpacity>
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
  },
  subtitle: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  link: {
    color: 'blue',
  },
  setupCon: {
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 128, 0, 1)',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontWeight: '500',
  }, 
  status: {
    position: 'absolute',
    top: 275,
    textAlign: 'center',
    zIndex: 2,
    fontSize: 28,
    fontWeight: '600',
    padding: 10,
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
  boardHeader: {
    flexDirection: 'row',
    borderColor: 'black',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
})

export default Game
