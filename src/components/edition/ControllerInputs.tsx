import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Control, FieldErrors, Controller } from "react-hook-form"
import { Character } from "../../interfaces/character"

interface ControlerInputProps {
  keyWord: keyof Character
  control: Control<Character, any>
  errors: FieldErrors<Character>
}

export const ControllerInput = ({ keyWord, control, errors }: ControlerInputProps) => {
  return (
    <Controller
      key={keyWord}
      name={keyWord}
      control={control}
      rules={{ required: "Can't be empty" }}
      render={({ field }) => (
        <TextField
          {...field}
          label={keyWord[0].toUpperCase() + keyWord.slice(1) + `${keyWord === 'image' ? 'URL' : ''}`}
          variant="outlined"
          size='small'
          error={!!errors[keyWord]}
          helperText={errors[keyWord] ? errors[keyWord]?.message : ''}
        />
      )}
    />
  )
}


type ControlerSelectProps = ControlerInputProps & {
  values: string[],
  defaultValue: string
}

export const ControllerSelect = ({ keyWord, control, errors, values, defaultValue }: ControlerSelectProps) => {
  return (
    <FormControl key={keyWord} error={!!errors[keyWord]}>
      <InputLabel id={`select-label-${keyWord}`}>{`Select an ${keyWord}`}</InputLabel>
      <Controller
        name={keyWord}
        control={control}
        rules={{ required: "Can't be empty" }}
        render={({ field }) => (
          <Select
            {...field}
            defaultValue={defaultValue}
            labelId={`select-label-${keyWord}`}
            label={`Select an ${keyWord}`}
            size='small'
          >
            {
              values.map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)
            }
          </Select>
        )}
      />

      {errors[keyWord] && (
        <FormHelperText>{errors[keyWord]?.message}</FormHelperText>
      )}
    </FormControl>
  )
}