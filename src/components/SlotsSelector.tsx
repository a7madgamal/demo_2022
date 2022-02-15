import { FC } from 'react'
import styled, { css } from 'styled-components'
import { SlotDayContainer } from './CompaniesContainer'

import { SlotCard } from './SlotCard'

type Props = {
  companyId: string
  slots: SlotDayContainer[]
}

export const SlotsSelector: FC<Props> = ({ slots, companyId }) => {
  return (
    <SlotsSelectorWrapper>
      {slots.map(({ dayTitle, daySlots }) => (
        <DayContainer key={dayTitle}>
          <DayTitle>{dayTitle}</DayTitle>
          {daySlots.map(({ startTime, endTime, isSelected, isSelectable }) => (
            <SlotCard
              startTime={startTime}
              endTime={endTime}
              isSelected={isSelected}
              isSelectable={isSelectable}
              onClick={() => {
                console.log({
                  companyId,
                  startTime,
                  endTime,
                  isSelected,
                  isSelectable,
                })
              }}
            ></SlotCard>
          ))}
        </DayContainer>
      ))}
    </SlotsSelectorWrapper>
  )
}

const DayContainer = styled.li`
  display: flex;
  flex-direction: column;
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
    margin: 0;
    padding: 0;
    text-indent: 0;
    list-style-type: none;
    padding: 10px;
    min-height: 400px;
    overflow-y: auto;
  `
)
