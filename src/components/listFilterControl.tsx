import React, { useState} from 'react'
import styles from '../scss/components/listFilterControl.module.scss'
import { TextInput, NativeSelect } from '@mantine/core'
const ListFilterControl: React.FC<{onFilteredChange : (filter: String, parameter: string)=>void}> = (props) => {
  const [selected, setSelected] = useState("firstName");
  const [filter, setFilter] = useState("");
  const select = <NativeSelect classNames={{defaultVariant: styles.input, label: styles.label}} value={selected} onChange={(event:React.ChangeEvent<HTMLSelectElement>) => {handleSelectedChange(event)}}  data={[{value: 'firstName', label: 'First Name'},{value: 'lastName', label: 'Last Name'},{value: 'email', label: 'E-mail'}]} />

  const handleSelectedChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
      setSelected(e.target.value)
      props.onFilteredChange(filter,e.target.value);
  }

  const handleFilterChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
    props.onFilteredChange(e.target.value,selected)
  }
  return (
      <TextInput
      label="Search Contacts"
        placeholder="Search..."
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {handleFilterChange(e)}}
        rightSection={select}
        rightSectionWidth={115}  
        classNames={{root : styles.inputWrapper, defaultVariant: styles.input}}
      />
  )
}

export default ListFilterControl;