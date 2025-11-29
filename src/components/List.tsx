import { ListProps } from '@/types';
import React, { FC } from 'react'
import ListItem from './ListItem';

const List: FC<ListProps> = ({items, setSelected, setOpen}) => {

  return (
    <ul
    className='pl-5 '
    >
      {
        items &&
          items?.map((item) => (
            <ListItem setOpen={setOpen} setSelected={setSelected} key={item.id} item={item} />
          ))
      }
    </ul>
  )
}

export default List