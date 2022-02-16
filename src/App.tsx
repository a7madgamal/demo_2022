import styled from 'styled-components'

import { CompaniesContainer } from './components/CompaniesContainer'

export const App = () => (
  <PageWrapper>
    {/* I could also go with the API call for all companies but this gives more control IMO (ie. too many companies, we can also give separate loading statuses...) */}
    <CompaniesContainer companyIds={['1', '2', '3']}></CompaniesContainer>
  </PageWrapper>
)

const PageWrapper = styled.div`
  font-family: ariel;
  width: 100%;
  display: flex;
  justify-content: center;
`
