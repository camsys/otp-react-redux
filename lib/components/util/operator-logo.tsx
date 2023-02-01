import { TransitOperator } from '@opentripplanner/types'
import { useIntl } from 'react-intl'
import React from 'react'
import styled from 'styled-components'

const OperatorImg = styled.img`
  height: 25px;
`

type Props = {
  operator?: TransitOperator
}

const OperatorLogo = ({ operator }: Props): JSX.Element | null => {
  const intl = useIntl()

  if (!operator?.logo) return null

  return (
    <OperatorImg
      alt={intl.formatMessage(
        {
          id: 'components.RouteRow.operatorLogoAltText'
        },
        { operatorName: operator.name }
      )}
      aria-label={intl.formatMessage(
        {
          id: 'components.RouteRow.operatorLogoAriaLabel'
        },
        { operatorName: operator.name }
      )}
      src={operator.logo}
    />
  )
}

export default OperatorLogo
