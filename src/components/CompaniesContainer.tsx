import { FC, useEffect, useReducer } from 'react'
import styled, { css } from 'styled-components'

import { CompanyColumn } from './CompanyColumn'
import { APIGetCompany } from '../types/API/companies'
import {
  companiesReducer,
  CompanyActionTypes,
  initialCompaniesState,
} from '../state/companies'
import { parseISODateString, renderDateRangeAsHour } from '../utils/time'

type SlotCardData = {
  startTime: string
  endTime: string
  isSelected: boolean
  isSelectable: boolean
  slotKey: string
}

export type SlotsPerDay = {
  dayTitle: string
  daySlots: SlotCardData[]
  dayKey: string
}

type Props = {
  companyIds: string[]
}

export type CompanyListData = {
  companyId: string
  companyName: string
  slotsPerDay: SlotsPerDay[]
}

export const CompaniesContainer: FC<Props> = ({ companyIds }) => {
  const [state, dispatch] = useReducer(companiesReducer, initialCompaniesState)

  useEffect(() => {
    const fetchCompanyList = async () => {
      const companyPromises = companyIds.map(async (companyId) => {
        return fetch(`http://localhost:3004/companies/${companyId}`)
      })

      const res = await Promise.all(companyPromises)

      const jsonArray = (await Promise.all(
        res.map((r) => r.json())
      )) as APIGetCompany[]

      dispatch({ type: CompanyActionTypes.LoadData, payload: jsonArray })
    }

    fetchCompanyList()
  }, [companyIds])

  return (
    <CompaniesContainerWrapper>
      {state ? (
        state.map(({ companyId, companyName, slotsPerDay }) => {
          let selectedSlot: string | undefined = undefined

          slotsPerDay.forEach(({ daySlots }) => {
            const result = daySlots.find((slots) => slots.isSelected)
            if (result) {
              selectedSlot = renderDateRangeAsHour(
                parseISODateString(result.startTime),
                parseISODateString(result.endTime)
              )
            }
          })

          return (
            <CompanyColumn
              key={companyId}
              companyId={companyId}
              companyName={companyName}
              slotsPerDay={slotsPerDay}
              dispatch={dispatch}
              selectedSlot={selectedSlot}
            ></CompanyColumn>
          )
        })
      ) : (
        <div>loading...</div>
      )}
    </CompaniesContainerWrapper>
  )
}

const CompaniesContainerWrapper = styled.div(
  () => css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    max-height: 90vh;
    padding: 8px;
    width: 100%;
  `
)
