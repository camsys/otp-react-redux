import { createAction } from 'redux-actions'

export const setAutoPlan = createAction('SET_AUTOPLAN')

// TODO: this should eventually be handled via mapState
export const setMapCenter = createAction('SET_MAP_CENTER')
export const setMapZoom = createAction('SET_MAP_ZOOM')
