import { ListItemProps } from '@/types';
import React, { FC, useEffect, useRef, useState } from 'react'
import List from './List';
import { cn } from '@/lib/utils';
import { TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';


const ListItem: FC<ListItemProps> = ({ item, setSelected, setOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const [height, setHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      if (contentRef.current) {
        setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
      }
    }, [isOpen]);

    const handleSelectElement = () => {
      if(!item.subcategories?.length && !item.services?.length) {
        setSelected(item.name);
        setOpen((val) => !val)
      } 
      toggleOpen()
    }

  return (
    <li
    >
      <div
      className={cn(' flex items-center gap-2 transition-all ease-linear max-h-full text-sm sm:text-base lg:text-lg p-1', {"font-medium": (item?.id % 2)})}
      >
        {(isOpen || (item?.subcategories || item?.services )) ? (<TriangleDownIcon className='text-primary-1 w-6 h-6' onClick={toggleOpen}/>) : (<TriangleRightIcon className={cn('text-primary-1 w-6 h-6', {"text-white w-4": (!item?.subcategories || item?.services)})}  onClick={toggleOpen}/>)}
        <p className='cursor-pointer' onClick={handleSelectElement}>{item.name}</p>
      </div>
        <div
        ref={contentRef}
        style={{height: isOpen ? '100%' : height}}
        className='transition-all overflow-auto ease-linear max-h-full'
        >
        {(item.subcategories || item.services) && (
          <List setOpen={setOpen} setSelected={setSelected} items={item?.subcategories || item?.services || []} />
        )}
        </div>
    </li>
  );
};

export default ListItem