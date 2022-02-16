import styled from 'styled-components'

import { CompaniesContainer } from './components/CompaniesContainer'

export const App = () => (
  <PageWrapper>
    <CompaniesContainer companyIds={['1', '2', '3']}></CompaniesContainer>
  </PageWrapper>
)

const PageWrapper = styled.div`
  font-family: ariel;
  width: 100%;
  display: flex;
  justify-content: center;
`
