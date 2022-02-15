import { FC } from 'react'
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'

import { SlotCard } from './SlotCard'

type SlotCardData = {
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
  isSelected: boolean
  isSelectable: boolean
}

type SlotDayContainer = { dayTitle: string; daySlots: SlotCardData[] }

type Props = {
  slots: SlotDayContainer[]
}

export const SlotsSelector: FC<Props> = ({ slots }) => {
  return (
    <SlotsSelectorWrapper>
      {slots.map(({ dayTitle, daySlots }) => (
        <DayContainer>
          <DayTitle>{dayTitle}</DayTitle>
          {daySlots.map(({ startTime, endTime, isSelected, isSelectable }) => (
            <SlotCard
              startTime={startTime}
              endTime={endTime}
              isSelected={isSelected}
              isSelectable={isSelectable}
              onClick={() => {
                console.log({ startTime, endTime, isSelected, isSelectable })
              }}
            ></SlotCard>
          ))}
        </DayContainer>
      ))}
    </SlotsSelectorWrapper>
  )
}

const DayContainer = styled.li`
  font-size: 14px;
  padding: 4px;
`
const DayTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin: 4px;
`

const SlotsSelectorWrapper = styled.ul<{}>(
  () => css`
    padding: 10px;
    overflow-y: auto;
  `
)
