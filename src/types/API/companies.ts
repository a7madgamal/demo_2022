enum CompanyType {
  Company = 'company',
}

type TimeSlot = {
  start_time: string
  end_time: string
}

export type APIGetCompany = {
  id: number
  name: string
  type: CompanyType.Company
  time_slots: TimeSlot[]
}
