import { Dispatch, FC } from 'react'
import styled from 'styled-components'
import { CompanyAction, CompanyActionTypes } from '../state/companies'
import { SlotsPerDay } from './CompaniesContainer'

import { SlotCard } from './SlotCard'

type Props = {
  companyId: string
  slotsPerDay: SlotsPerDay[]
  dispatch: Dispatch<CompanyAction>
  selectedSlot: string | undefined
}

export const SlotsSelector: FC<Props> = ({
  slotsPerDay,
  companyId,
  dispatch,
  selectedSlot,
}) => {
  return (
    <SlotsSelectorWrapper>
      {slotsPerDay.map(({ dayTitle, daySlots, dayKey }) => (
        <DayContainer key={dayKey}>
          <DayTitle>{dayTitle}</DayTitle>
          {daySlots.map(
            ({ startTime, endTime, isSelected, isSelectable, slotKey }) => (
              <SlotCard
                key={slotKey}
                startTime={startTime}
                endTime={endTime}
                isSelected={isSelected}
                isSelectable={selectedSlot ? isSelected : isSelectable}
                onClick={() => {
                  if (isSelected) {
                    dispatch({
                      type: CompanyActionTypes.UnreserveTimeSlot,
                      payload: { companyId, startTime, endTime },
                    })
                  } else {
                    if (!selectedSlot) {
                      if (isSelectable) {
                        dispatch({
                          type: CompanyActionTypes.ReserveTimeSlot,
                          payload: { companyId, startTime, endTime },
                        })
                      }
                    }
                  }
                }}
              />
            )
          )}
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
  text-align: center;
`

const SlotsSelectorWrapper = styled.ul`
  margin: 0;
  text-indent: 0;
  list-style-type: none;
  padding: 8px;
  overflow-y: auto;
`
