// TODO: Typescript
/* eslint-disable react/prop-types */
/**
 * This overlay is similar to gtfs-rt-vehicle-overlay in that it shows
 * realtime positions of vehicles on a route using the otp-ui/transit-vehicle-overlay.
 *
 * However, this overlay differs in a few ways:
 * 1) This overlay retrieves vehicle locations from OTP
 * 2) This overlay renders vehicles as blobs rather than a custom shape
 * 3) This overlay does not handle updating positions
 * 4) This overlay does not render route paths
 * 5) This overlay has a custom popup on vehicle hover
 */

import { connect } from 'react-redux'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import React from 'react'
import TransitVehicleOverlay, {
  Circle,
  withCaret,
  withRouteColorBackground
} from '@opentripplanner/transit-vehicle-overlay'

import FormattedTransitVehicleStatus from '../util/formatted-transit-vehicle-status'

function VehicleTooltip(props) {
  const { intl, vehicle } = props

  let vehicleLabel = vehicle?.label || vehicle?.vehicleId
  // If a vehicle's label prop is less than 5 characters long, we can assume it is a vehicle
  // number. If this is the case, or if a vehicleId prop is provided,
  // render as "Vehicle <vehicleId>" (or the equivalent in the user's language).
  // Otherwise, the label itself is enough
  //   (this is TriMet-specific, when label contains text such as "MAX Green").
  if (
    vehicleLabel !== null &&
    (vehicleLabel?.length <= 5 || vehicle?.vehicleId)
  ) {
    vehicleLabel = intl.formatMessage(
      { id: 'components.TransitVehicleOverlay.vehicleName' },
      { vehicleNumber: vehicleLabel }
    )
  } else if (vehicle?.label) {
    vehicleLabel = vehicle?.label
  }

  const stopStatus = vehicle?.stopStatus || 'in_transit_to'

  // FIXME: This may not be timezone adjusted as reported seconds may be in the wrong timezone.
  // All needed info to fix this is available via route.agency.timezone
  // However, the needed coreUtils methods are not updated to support this
  return (
    <>
      <span>
        {/* FIXME: move back to core-utils for time handling */}
        <FormattedMessage
          id="components.TransitVehicleOverlay.realtimeVehicleInfo"
          values={{
            relativeTime: intl.formatRelativeTime(
              Math.floor(vehicle?.seconds - Date.now() / 1000)
            ),
            strong: (m) => <strong style={{ fontSize: '110%' }}>{m}</strong>,
            vehicleNameOrBlank: vehicleLabel
          }}
        />
      </span>
      {stopStatus !== 'STOPPED_AT' && vehicle?.speed > 0 && (
        <div>
          <FormattedMessage
            id="components.TransitVehicleOverlay.travelingAt"
            values={{
              milesPerHour: (
                <FormattedNumber
                  // Not a "real" style prop
                  // eslint-disable-next-line react/style-prop-object
                  style="unit"
                  unit="mile-per-hour"
                  value={Math.round(vehicle.speed)}
                />
              )
            }}
          />
        </div>
      )}
      {vehicle?.nextStopName && (
        <div>
          <FormattedTransitVehicleStatus
            stop={vehicle.nextStopName}
            stopStatus={stopStatus.toLowerCase()}
          />
        </div>
      )}
    </>
  )
}

// Round vehicle symbol with arrow/caret on the border,
// and showing the route color with a transparent effect on hover.
const IconContainer = withRouteColorBackground(
  withCaret(Circle, { height: 5, offset: 1.5, width: 10 }),
  {
    alphaHex: 'aa',
    display: 'onhover'
  }
)

// connect to the redux store

const mapStateToProps = (state) => {
  const viewedRoute = state.otp.ui.viewedRoute
  const route = state.otp.transitIndex?.routes?.[viewedRoute?.routeId]

  let vehicleList = []

  // Add missing fields to vehicle list
  if (viewedRoute?.routeId) {
    vehicleList = route?.vehicles?.map((vehicle) => {
      vehicle.routeType = route?.mode
      vehicle.routeColor = route?.color
      // Try to populate this attribute, which is required for the vehicle popup to appear.
      vehicle.routeShortName = vehicle.routeShortName || route?.shortName
      vehicle.textColor = route?.routeTextColor
      return vehicle
    })

    // Remove all vehicles not on pattern being currently viewed
    if (viewedRoute.patternId && vehicleList) {
      vehicleList = vehicleList.filter(
        (vehicle) => vehicle.patternId === viewedRoute.patternId
      )
    }
  }
  return {
    color: route?.color ? '#' + route.color : null,
    IconContainer,
    // Note: with OTP2, we are showing route stops along with the route alignment,
    // and vehicle direction arrows become difficult to distinguish from the stop circles.
    TooltipSlot: injectIntl(VehicleTooltip),
    vehicles: vehicleList
  }
}

const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransitVehicleOverlay)
