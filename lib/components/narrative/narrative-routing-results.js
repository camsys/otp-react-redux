// TODO: migrate to typescript
/* eslint-disable react/prop-types */
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  getActiveError,
  getActiveItineraries,
  getActiveSearch
} from '../../util/state'
import { setMainPanelContent } from '../../actions/ui'
import ErrorMessage from '../form/error-message'

import Loading from './loading'
import TabbedItineraries from './tabbed-itineraries'

class NarrativeRoutingResults extends Component {
  static propTypes = {
    routingType: PropTypes.string
  }

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.itineraries || prevProps.itineraries.length === 0) &&
      this.props.itineraries &&
      this.props.itineraries.length > 0
    ) {
      this.props.setMainPanelContent(null)
    }
    if (!prevProps.error && this.props.error)
      this.props.setMainPanelContent(null)
  }

  render() {
    const { error, itineraries, mainPanelContent, pending, routingType } =
      this.props

    if (pending) return <Loading />
    if (error && itineraries.length === 0) return <ErrorMessage />
    if (routingType && itineraries.length === 0) {
      return (
        <div className="emtpyResults">
          <FormattedMessage id="components.NarrativeRoutingResults.emptyResults" />
        </div>
      )
    }
    if (mainPanelContent) return null

    return (
      // TODO: If multiple routing types exist, do the check here.
      <TabbedItineraries error={error} itineraries={itineraries} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const activeSearch = getActiveSearch(state)
  const pending = activeSearch ? Boolean(activeSearch.pending) : false
  return {
    error: getActiveError(state),
    itineraries: getActiveItineraries(state),
    mainPanelContent: state.otp.ui.mainPanelContent,
    pending,
    routingType: activeSearch && activeSearch.query.routingType
  }
}

const mapDispatchToProps = {
  setMainPanelContent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NarrativeRoutingResults)
