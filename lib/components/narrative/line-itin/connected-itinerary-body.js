/* eslint-disable react/prop-types */
// TODO: Typescript (otp-rr config object)
import { clone, cloneDeep } from 'lodash'
import { connect } from 'react-redux'
import {
  PlaceName as PlaceNameWrapper,
  PlaceRowWrapper
} from '@opentripplanner/itinerary-body/lib/styled'
import isEqual from 'lodash.isequal'
import ItineraryBody from '@opentripplanner/itinerary-body/lib/otp-react-redux/itinerary-body'
import LineColumnContent from '@opentripplanner/itinerary-body/lib/otp-react-redux/line-column-content'
import PlaceName from '@opentripplanner/itinerary-body/lib/otp-react-redux/place-name'
import React, { Component } from 'react'
import RouteDescription from '@opentripplanner/itinerary-body/lib/otp-react-redux/route-description'
import styled from 'styled-components'
import TransitLegSummary from '@opentripplanner/itinerary-body/lib/defaults/transit-leg-summary'

import { ComponentContext } from '../../../util/contexts'
import { setLegDiagram, setMapillaryId } from '../../../actions/map'
import { setViewedTrip } from '../../../actions/ui'
import TripDetails from '../connected-trip-details'
import TripTools from '../trip-tools'

import RealtimeTimeColumn from './realtime-time-column'
import TransitLegSubheader from './connected-transit-leg-subheader'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

const ItineraryBodyContainer = styled.div`
  padding: 0px 0px;
`

const StyledItineraryBody = styled(ItineraryBody)`
  ${PlaceNameWrapper} {
    font-weight: inherit;
  }
  ${PlaceRowWrapper} {
    max-width: inherit;
  }
`

class ConnectedItineraryBody extends Component {
  static contextType = ComponentContext

  /** avoid rerendering if the itinerary to display hasn't changed */
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props.itinerary, nextProps.itinerary)
  }

  render() {
    const {
      accessibilityScoreGradationMap,
      config,
      diagramVisible,
      itinerary,
      setActiveLeg,
      setLegDiagram,
      setMapillaryId,
      setViewedTrip,
      timeOptions
    } = this.props
    const { LegIcon } = this.context

    const tripDetailItin = cloneDeep(itinerary)
    tripDetailItin.startTime = itinerary.startTime + timeOptions.offset

    const pickupNumbers = []
    const dropOffNumbers = []
    tripDetailItin.legs.map((leg) => {
      if (
        pickupNumbers.some((number) => {
          return number === leg.pickupBookingInfo?.contactInfo?.phoneNumber
        })
      ) {
        delete leg.pickupBookingInfo
      } else {
        pickupNumbers.push(leg.pickupBookingInfo?.contactInfo?.phoneNumber)
      }
      if (
        dropOffNumbers.some((number) => {
          return number === leg.dropOffBookingInfo?.contactInfo?.phoneNumber
        })
      ) {
        delete leg.dropOffBookingInfo
      } else {
        dropOffNumbers.push(leg.dropOffBookingInfo?.contactInfo?.phoneNumber)
      }
    })

    let bookingUrl = ''
    console.log(itinerary.legs[0].bookingUrl)
    if (itinerary.legs && itinerary.legs[0] && itinerary.legs[0].bookingUrl) {
      bookingUrl = itinerary.legs[0].bookingUrl
      console.log(bookingUrl)
    }

    return (
      <ItineraryBodyContainer>
        <StyledItineraryBody
          accessibilityScoreGradationMap={accessibilityScoreGradationMap}
          config={config}
          diagramVisible={diagramVisible}
          itinerary={itinerary}
          LegIcon={LegIcon}
          LineColumnContent={LineColumnContent}
          mapillaryCallback={setMapillaryId}
          mapillaryKey={config?.mapillary?.key}
          PlaceName={PlaceName}
          RouteDescription={RouteDescription}
          setActiveLeg={setActiveLeg}
          setLegDiagram={setLegDiagram}
          setViewedTrip={setViewedTrip}
          showAgencyInfo
          showElevationProfile={config.elevationProfile}
          showLegIcon
          showMapButtonColumn={false}
          showRouteFares={config.itinerary && config.itinerary.showRouteFares}
          showViewTripButton
          TimeColumnContent={RealtimeTimeColumn}
          timeOptions={timeOptions}
          toRouteAbbreviation={noop}
          TransitLegSubheader={TransitLegSubheader}
          TransitLegSummary={TransitLegSummary}
        />
        <TripDetails itinerary={tripDetailItin} />
        {bookingUrl && (
          <a href={bookingUrl} rel="noreferrer" target="_blank">
            [DEMO USE ONLY] Click here to book
          </a>
        )}
        <TripTools itinerary={itinerary} />
      </ItineraryBodyContainer>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    config: state.otp.config,
    diagramVisible: state.otp.ui.diagramLeg
  }
}

const mapDispatchToProps = {
  setLegDiagram,
  setMapillaryId,
  setViewedTrip
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedItineraryBody)
