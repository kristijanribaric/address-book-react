import React from 'react'
import { SegmentedControl, InputWrapper } from '@mantine/core'
import styles from '../scss/components/listNumberControl.module.scss'


const ListNumberControl : React.FC<{contactsNumber: string, onChangeNumber: (val:string)=> void}> = (props) => {
  return (
    <div className={styles.wrapper}>

        <InputWrapper label="Contacts per page" classNames={{label : styles.label}}>
          <SegmentedControl
              value={props.contactsNumber}
              onChange={(value)=> {props.onChangeNumber(value)}}
              data={[
                  { label: '15', value: '15' },
                  { label: '30', value: '30' },
                  { label: '45', value: '45' },
              ]}
          />
        </InputWrapper>
    </div>
  )
}

export default ListNumberControl;