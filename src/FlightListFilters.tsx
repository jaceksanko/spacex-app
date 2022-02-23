import React, {ChangeEvent, FormEvent, useState} from "react";


interface Props {
  updateMissionName: (value: string) => void,
}

export default function FlightListFilters({updateMissionName}:Props) {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value)


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateMissionName(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Wpisz nazwę misji</p>
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <button type="submit">Wyślij</button>
    </form>
  );
}
