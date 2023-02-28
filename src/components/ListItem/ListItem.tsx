import { FC } from 'react'
import { IDataItem } from '../List/List'
import cls from './ListItem.module.scss'

interface ListItemProps extends IDataItem {}

export const ListItem: FC<ListItemProps> = (props) => {
  const { albumId, id, title, url } = props
  return (
    <div className={cls.ListItem}>
      <p>{title}</p>
      <img src={url} alt="" />
    </div>
  )
}
