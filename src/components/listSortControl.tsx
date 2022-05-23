import React from 'react'
import { SegmentedControl, InputWrapper } from '@mantine/core'
import { ImSortAlphaDesc, ImSortAlphaAsc } from 'react-icons/im'
import styles from '../scss/components/listSortControl.module.scss'

const ListSortControl : React.FC<{onChangeSort: (value:string)=>void}> = (props) => {
  return (
    <InputWrapper label="Sort by Last Name" classNames={{label : styles.label}}>
      <SegmentedControl
              onChange={(value)=> {props.onChangeSort(value)}}
              data={[
                  { label: <ImSortAlphaAsc className={styles.icon}/>, value: 'asc' },
                  { label: <ImSortAlphaDesc className={styles.icon}/>, value: 'desc' },
              ]}
      />
    </InputWrapper>
  )
}

export default ListSortControl;