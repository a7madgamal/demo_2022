enum CompanyType {
  'company' = 'company',
}

type TimeSlot = {
  start_time: string
  end_time: string
}

export type APIGetCompany = {
  id: number
  name: string
  type: CompanyType.company
  time_slots: TimeSlot[]
}
