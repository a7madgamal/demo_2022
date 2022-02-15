import { FC, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'

import { CompanyColumn } from './CompanyColumn'
import { APIGetCompany } from '../types/API/companies'
import { parseISODateString } from '../utils/time'

type SlotCardData = {
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
  isSelected: boolean
  isSelectable: boolean
}

export type SlotDayContainer = { dayTitle: string; daySlots: SlotCardData[] }

type Props = {
  companyIds: string[]
}

type CompanyListData = {
  companyId: string
  companyName: string
  slots: SlotDayContainer[]
}

export const CompaniesContainer: FC<Props> = ({ companyIds }) => {
  const [companyList, setCompanyList] = useState<CompanyListData[] | undefined>(
    undefined
  )

  useEffect(() => {
    const fetchCompanyList = async () => {
      const companyPromises = companyIds.map(async (companyId) => {
        return fetch(`http://localhost:3004/companies/${companyId}`)
      })

      const res = await Promise.all(companyPromises)

      const jsonArray = (await Promise.all(
        res.map((r) => r.json())
      )) as APIGetCompany[]

      setCompanyList(
        jsonArray.map((company) => ({
          companyId: `${company.id}`,
          companyName: company.name,
          slots: company.time_slots.map((timeSlot) => ({
            dayTitle: 'tmp day',
            daySlots: [
              {
                startTime: parseISODateString(timeSlot.start_time),
                endTime: parseISODateString(timeSlot.end_time),
                isSelected: false,
                isSelectable: true,
              },
            ],
          })),
        }))
      )
    }

    fetchCompanyList()
  }, [companyIds])

  return (
    <CompaniesContainerWrapper>
      {companyList ? (
        companyList.map(({ companyId, companyName, slots }) => (
          <CompanyColumn
            key={companyId}
            companyId={companyId}
            companyName={companyName}
            slots={slots}
          ></CompanyColumn>
        ))
      ) : (
        <div>loading...</div>
      )}
    </CompaniesContainerWrapper>
  )
}

const CompaniesContainerWrapper = styled.div<{}>(
  () => css`
    display: flex;
    flex-direction: row;
    max-height: 90vh;
    padding: 10px;
    /* background-color: lightgreen; */
  `
)
