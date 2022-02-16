import { Dispatch, FC } from 'react'
import styled, { css } from 'styled-components'

import { CompanyAction } from '../state/companies'
import { COLORS } from '../theme/colors'
import { SlotsPerDay } from './CompaniesContainer'
import { SlotsSelector } from './SlotsSelector'

type Props = {
  companyName: string
  companyId: string
  slotsPerDay: SlotsPerDay[]
  dispatch: Dispatch<CompanyAction>
  selectedSlot: string | undefined
}

export const CompanyColumn: FC<Props> = ({
  companyId,
  companyName,
  slotsPerDay,
  dispatch,
  selectedSlot,
}) => (
  <CompanyColumnWrapper>
    <CompanyNameWrapper>{companyName}</CompanyNameWrapper>
    <SelectedSlotWrapper hasSelection={!!selectedSlot}>
      {selectedSlot || 'No selection'}
    </SelectedSlotWrapper>
    <SlotsSelector
      slotsPerDay={slotsPerDay}
      companyId={companyId}
      dispatch={dispatch}
      selectedSlot={selectedSlot}
    />
  </CompanyColumnWrapper>
)

const SelectedSlotWrapper = styled.div<{ hasSelection: boolean }>(
  ({ hasSelection }) => css`
    padding: 8px;
    background-color: ${hasSelection
      ? COLORS.LightGreen
      : COLORS.VeryLightGray};
    font-weight: ${hasSelection ? 'bold' : 'normal'};
    min-height: 20px;
    text-align: center;
    margin-bottom: 16px;
    border-radius: 4px;
  `
)

const CompanyNameWrapper = styled.h3`
  padding: 8px;
  background-color: ${COLORS.LightBlue};
  text-align: center;
  margin-bottom: 16px;
  border-radius: 4px;
`

const CompanyColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 100%;
  max-width: 250px;
  min-width: 150px;
  margin-left: 20px;
  border: 1px solid ${COLORS.VeryLightGray};
`
