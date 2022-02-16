import { CompanyListData, SlotsPerDay } from '../components/CompaniesContainer'
import { APIGetCompany } from '../types/API/companies'
import { parseISODateString } from '../utils/time'

type CompaniesState = CompanyListData[] | false
export const initialCompaniesState: CompaniesState = false

export enum CompanyActionTypes {
  LoadData = 'LoadData',
  ReserveTimeSlot = 'ReserveTimeSlot',
  UnreserveTimeSlot = 'UnreserveTimeSlot',
}

export type CompanyAction =
  | {
      type: CompanyActionTypes.LoadData
      payload: APIGetCompany[]
    }
  | {
      type: CompanyActionTypes.ReserveTimeSlot
      payload: {
        companyId: string
        startTime: string
        endTime: string
      }
    }
  | {
      type: CompanyActionTypes.UnreserveTimeSlot
      payload: {
        companyId: string
        startTime: string
        endTime: string
      }
    }

const generateSlotsPerDay = (
  timeSlots: APIGetCompany['time_slots'],
  companyId: string
) => {
  const orderedSlots = timeSlots.sort((a, b) => {
    const datea = new Date(a.start_time)
    const dateb = new Date(b.start_time)

    // @ts-ignore sorry TS but this works 🤷🏻‍♂️
    return datea - dateb
  })

  const hash: { [key: string]: SlotsPerDay } = {}

  orderedSlots.forEach((slot) => {
    const dayTitle = parseISODateString(slot.start_time).format('dddd')
    const lookupKey = `${companyId}_${dayTitle}`
    const id = `${companyId}_${slot.start_time}_${slot.end_time}`

    if (hash[lookupKey]) {
      hash[lookupKey] = {
        dayKey: id,
        dayTitle,
        daySlots: [
          ...hash[lookupKey].daySlots,
          {
            startTime: slot.start_time,
            endTime: slot.end_time,
            isSelected: false,
            isSelectable: true,
            slotKey: id,
          },
        ],
      }
    } else {
      hash[lookupKey] = {
        dayKey: id,
        dayTitle,
        daySlots: [
          {
            startTime: slot.start_time,
            endTime: slot.end_time,
            isSelected: false,
            isSelectable: true,
            slotKey: id,
          },
        ],
      }
    }
  })

  const slots = Object.entries(hash).map(([, value]) => ({
    dayTitle: value.dayTitle,
    daySlots: value.daySlots,
    dayKey: value.dayKey,
  }))

  return slots
}

export const companiesReducer = (
  state: CompaniesState,
  action: CompanyAction
): CompaniesState => {
  switch (action.type) {
    case CompanyActionTypes.LoadData: {
      return action.payload.map((company) => ({
        companyId: `${company.id}`,
        companyName: company.name,
        slotsPerDay: generateSlotsPerDay(company.time_slots, `${company.id}`),
      }))
    }

    case CompanyActionTypes.ReserveTimeSlot: {
      if (state) {
        return state.map((companyState) => ({
          ...companyState,
          slotsPerDay: companyState.slotsPerDay.map((slotsPerDay) => ({
            ...slotsPerDay,
            daySlots: slotsPerDay.daySlots.map((slot) => {
              if (
                action.payload.startTime === slot.startTime &&
                action.payload.endTime === slot.endTime
              ) {
                return {
                  ...slot,
                  isSelected:
                    action.payload.companyId === companyState.companyId
                      ? true
                      : slot.isSelected,
                  isSelectable:
                    action.payload.companyId === companyState.companyId,
                }
              } else {
                return { ...slot }
              }
            }),
          })),
        }))
      } else {
        return false
      }
    }

    case CompanyActionTypes.UnreserveTimeSlot: {
      console.log({ ReserveTimeSlot: 'ReserveTimeSlot', state })

      if (state) {
        const newState = state.map((companyState) => ({
          ...companyState,
          slotsPerDay: companyState.slotsPerDay.map((slotsPerDay) => ({
            ...slotsPerDay,
            daySlots: slotsPerDay.daySlots.map((slot) => {
              if (
                action.payload.startTime === slot.startTime &&
                action.payload.endTime === slot.endTime
              ) {
                return {
                  ...slot,
                  isSelected:
                    action.payload.companyId === companyState.companyId
                      ? false
                      : slot.isSelected,
                  isSelectable: true,
                }
              } else {
                return { ...slot }
              }
            }),
          })),
        }))
        console.log({ newState })

        return newState
      } else {
        return false
      }
    }

    default:
      return initialCompaniesState
  }
}
