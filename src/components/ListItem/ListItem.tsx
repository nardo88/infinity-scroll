import { FC } from 'react'
import { IDataItem } from '../List/List'
import cls from './ListItem.module.scss'

interface ListItemProps extends IDataItem {
  index: number
}

export const ListItem: FC<ListItemProps> = (props) => {
  const { albumId, id, title, url, index } = props
  return (
    <div className={cls.ListItem}>
      <p>
        <span className={cls.number}>{index}</span>
        {title}
      </p>
      <img src={url} alt="" />
    </div>
  )
}
