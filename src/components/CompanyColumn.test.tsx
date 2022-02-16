import { render, screen } from '@testing-library/react'
import { SlotsPerDay } from './CompaniesContainer'
import { CompanyColumn } from './CompanyColumn'

test('renders loader', () => {
  const slotsPerDay: SlotsPerDay[] = [
    {
      dayTitle: 'Monday',
      daySlots: [
        {
          slotKey: 'slot_key_1',
          startTime: '2018-07-09T08:00:00.000+02:00',
          endTime: '2018-07-09T09:30:00.000+02:00',
          isSelected: false,
          isSelectable: true,
        },
        {
          slotKey: 'slot_key_2',
          startTime: '2018-07-09T09:30:00.000+02:00',
          endTime: '2018-07-09T10:00:00.000+02:00',
          isSelected: false,
          isSelectable: true,
        },
      ],
      dayKey: 'monday',
    },
  ]
  const mockDispatch = jest.fn()

  render(
    <CompanyColumn
      companyName="Test Inc."
      companyId="TEST_ID"
      slotsPerDay={slotsPerDay}
      selectedSlot={undefined}
      dispatch={mockDispatch}
    />
  )

  expect(screen.getByText(/08:00 - 09:30/i)).toBeInTheDocument()
  expect(screen.getByText(/09:30 - 10:00/i)).toBeInTheDocument()
  expect(screen.getByText(/Monday/i)).toBeInTheDocument()
})
