import { FC } from 'react'
import styled, { css } from 'styled-components'

import { parseISODateString, renderDateRangeAsHour } from '../utils/time'
import { COLORS } from '../theme/colors'

type Props = {
  startTime: string
  endTime: string
  isSelected: boolean
  isSelectable: boolean
  onClick: () => void
}

export const SlotCard: FC<Props> = ({
  startTime,
  endTime,
  isSelected,
  isSelectable,
  onClick,
}) => {
  return (
    <SlotCardWrapper
      isSelected={isSelected}
      isSelectable={isSelectable}
      onClick={onClick}
    >
      {renderDateRangeAsHour(
        parseISODateString(startTime),
        parseISODateString(endTime)
      )}
    </SlotCardWrapper>
  )
}

const SlotCardWrapper = styled.span<{
  isSelected: boolean
  isSelectable: boolean
}>(
  ({ isSelected, isSelectable }) => css`
    padding: 8px;
    margin-bottom: 4px;
    font-size: 18px;
    font-family: monospace;
    font-weight: ${isSelected ? 'bold' : 'normal'};
    border: 1px solid ${COLORS.VeryLightGray};
    border-radius: 4px;
    cursor: ${isSelectable ? 'pointer' : 'not-allowed'};
    text-align: center;
    color: ${isSelectable
      ? isSelected
        ? COLORS.Black
        : COLORS.Gray
      : COLORS.LightRed};

    background-color: ${isSelectable
      ? isSelected
        ? COLORS.LightGreen
        : COLORS.White
      : COLORS.Gray};
  `
)
