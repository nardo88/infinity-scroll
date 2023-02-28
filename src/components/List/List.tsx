import { FC, useCallback, useEffect, useState } from 'react'
import { ListItem } from '../ListItem/ListItem'
import cls from './List.module.scss'

interface ListProps {
  className?: string
}

export interface IDataItem {
  albumId: number
  id: number
  url: string
  title: string
}

export const List: FC<ListProps> = ({ className }) => {
  const [dataList, setDataList] = useState<IDataItem[]>([])
  console.log('dataList: ', dataList)
  const [currentPage, setCurrentPage] = useState(1)

  const getData = useCallback(async () => {
    const data: IDataItem[] = await fetch(
      // eslint-disable-next-line
      `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
    ).then((res) => res.json())

    setDataList((prev) => {
      const newState = [...prev]
      newState.push(...data)
      return newState
    })
  }, [currentPage])

  useEffect(() => {
    getData()
  }, [getData, currentPage])

  return (
    <div className={cls.List}>
      {dataList.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
    </div>
  )
}
