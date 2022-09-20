import React, { FunctionComponent } from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import { InputRowProps } from "../types"

const InputRow: FunctionComponent<InputRowProps>  = ({
  label,
  value,
  onChange,
}) => {

  return (
    <View style={styles.inputRow}>
      <Text style={styles.label}>
        {label}
      </Text>
      <TextInput
        keyboardType='decimal-pad'
        value={value}
        onChangeText={value => onChange(value)}
        style={styles.input}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputRow: {
    width: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    width: 100,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 10,
    width: 100,
    borderRadius: 10,
  },
})

export default InputRow
