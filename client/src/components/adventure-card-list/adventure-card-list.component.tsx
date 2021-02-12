import React from 'react'
import AdventureCard from '../adventure-card/adventure-card.component'

interface IProps {
  adventures: IAdventure[]
}

export interface IAdventure {
  _id: string
  name: string
  pictures: string[]
  date: string
  [key: string]: any
}

const AdventureCardList = ({ adventures }: IProps) => {
  return (
    <div className="adventure-card-list">
      {adventures.map((adventure, index) => (
        <AdventureCard adventure={adventure} key={index} />
      ))}
    </div>
  )
}

export default AdventureCardList
