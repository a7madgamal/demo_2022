import { FC } from 'react'
import styled, { css } from 'styled-components'
import { SlotDayContainer } from './CompaniesContainer'
import { SlotsSelector } from './SlotsSelector'

type Props = {
  companyName: string
  companyId: string
  slots: SlotDayContainer[]
}

export const CompanyColumn: FC<Props> = ({ companyId, companyName, slots }) => {
  return (
    <CompanyColumnWrapper>
      <CompanyNameWrapper>{companyName}</CompanyNameWrapper>
      <SlotsSelector slots={slots} companyId={companyId}></SlotsSelector>
    </CompanyColumnWrapper>
  )
}

const CompanyNameWrapper = styled.div<{}>(
  () => css`
    padding: 10px;
    background-color: lightblue;
  `
)

const CompanyColumnWrapper = styled.div<{}>(
  () => css`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 250px;
    margin-left: 20px;
    border: 1px solid gray;
  `
)
