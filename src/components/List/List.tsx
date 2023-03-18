import {
  FC,
  MutableRefObject,
  UIEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import { useThrottle } from '../../hooks/useThrottle'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  console.log('currentPage: ', currentPage)
  const TOTAL = 100

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: () => {
      if (dataList.length < TOTAL && !isLoading) {
        console.log('trigger')
        setCurrentPage(currentPage + 1)
        setIsLoading(true)
      }
    },
  })

  const getData = useCallback(async () => {
    setIsLoading(true)

    fetch(
      // eslint-disable-next-line
      `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setDataList((prev) => {
          const newState = [...prev]
          newState.push(...data)
          return newState
        })
      })
      .then(() => {
        setIsLoading(false)
      })
  }, [currentPage])

  useEffect(() => {
    getData()
  }, [getData, currentPage])

  return (
    <div className={cls.List} ref={wrapperRef}>
      {dataList.map((item, i) => (
        <ListItem key={item.id} {...item} index={i + 1} />
      ))}
      <div ref={triggerRef} className={cls.trigger} />
    </div>
  )
}
