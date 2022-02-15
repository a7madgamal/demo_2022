import { FC } from 'react'
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'

import { renderDateRangeAsHour } from '../utils/time'
import { COLORS } from '../theme/colors'

type Props = {
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
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
      {renderDateRangeAsHour(startTime, endTime)}
    </SlotCardWrapper>
  )
}

// todo: use styled-components themes
const SlotCardWrapper = styled.span<{
  isSelected: boolean
  isSelectable: boolean
}>(
  ({ isSelected, isSelectable }) => css`
    padding: 10px;
    background-color: ${isSelectable
      ? isSelected
        ? '#f5f5f5'
        : COLORS.white
      : '#444'};
  `
)
