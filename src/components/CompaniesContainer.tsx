import { FC, useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'

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

export type CompanyListData = {
  companyId: string
  companyName: string
  slotsPerDay: SlotsPerDay[]
}

type Props = {
  companyIds: string[]
}

export const CompaniesContainer: FC<Props> = ({ companyIds }) => {
  const [state, dispatch] = useReducer(companiesReducer, initialCompaniesState)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchCompanyList = async () => {
      const companyPromises = companyIds.map(async (companyId) =>
        fetch(`http://localhost:3004/companies/${companyId}`)
      )

      let results

      try {
        results = await Promise.all(companyPromises)

        const jsonArray: APIGetCompany[] = await Promise.all(
          results.map((r) => r.json())
        )

        dispatch({ type: CompanyActionTypes.LoadData, payload: jsonArray })
      } catch (error) {
        console.log(error)
        setHasError(true)
      }
    }

    fetchCompanyList()
  }, [companyIds])

  return (
    <CompaniesContainerWrapper>
      {hasError && <div>Fetching failed!</div>}

      {!hasError && !state && <div>loading...</div>}

      {state &&
        !hasError &&
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
        })}
    </CompaniesContainerWrapper>
  )
}

const CompaniesContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-height: 90vh;
  padding: 8px;
  width: 100%;
`
