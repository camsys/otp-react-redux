import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import polyline from "@mapbox/polyline";
import turfAlong from "@turf/along"; // All OTP transit modes

export var transitModes = ["TRAM", "BUS", "SUBWAY", "FERRY", "RAIL", "GONDOLA", "FLEX"];
/**
 * @param  {config} config OTP-RR configuration object
 * @return {Array}  List of all transit modes defined in config; otherwise default mode list
 */

export function getTransitModes(config) {
  if (!config || !config.modes || !config.modes.transitModes) return transitModes;
  return config.modes.transitModes.map(function (tm) {
    return tm.mode;
  });
}
export function isTransit(mode) {
  return transitModes.includes(mode) || mode === "TRANSIT";
}
/**
 * Returns true if the leg pickup rules enabled which require
 * calling ahead for the service to run. "mustPhone" is the only
 * property of boardRule which encodes this info.
 */

export function isReservationRequired(leg) {
  return leg.boardRule === "mustPhone";
}
/**
 * Returns true if the leg has continuous dropoff enabled which requires
 * asking the driver to let the user off. "coordinateWithDriver" is the only
 * property of alightRule which encodes this info.
 */

export function isContinuousDropoff(leg) {
  return leg.alightRule === "coordinateWithDriver";
}
/**
 * The two rules checked by the above two functions are the only values
 * returned by OTP when a leg is a flex leg.
 */

export function isFlex(leg) {
  return isReservationRequired(leg) || isContinuousDropoff(leg);
}
export function isAdvanceBookingRequired(info) {
  var _info$latestBookingTi;

  return (info === null || info === void 0 ? void 0 : (_info$latestBookingTi = info.latestBookingTime) === null || _info$latestBookingTi === void 0 ? void 0 : _info$latestBookingTi.daysPrior) > 0;
}
export function legDropoffRequiresAdvanceBooking(leg) {
  return isAdvanceBookingRequired(leg.dropOffBookingInfo);
}
export function isWalk(mode) {
  if (!mode) return false;
  return mode === "WALK";
}
export function isBicycle(mode) {
  if (!mode) return false;
  return mode === "BICYCLE";
}
export function isBicycleRent(mode) {
  if (!mode) return false;
  return mode === "BICYCLE_RENT";
}
export function isCar(mode) {
  if (!mode) return false;
  return mode.startsWith("CAR");
}
export function isMicromobility(mode) {
  if (!mode) return false;
  return mode.startsWith("MICROMOBILITY");
}
export function isAccessMode(mode) {
  return isWalk(mode) || isBicycle(mode) || isBicycleRent(mode) || isCar(mode) || isMicromobility(mode);
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are transit modes
 */

export function hasTransit(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return isTransit(mode);
  });
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are car-based modes
 */

export function hasCar(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return isCar(mode);
  });
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are bicycle-based modes
 */

export function hasBike(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return isBicycle(mode) || isBicycleRent(mode);
  });
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes are micromobility-based modes
 */

export function hasMicromobility(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return isMicromobility(mode);
  });
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes is a hailing mode
 */

export function hasHail(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return mode.indexOf("_HAIL") > -1;
  });
}
/**
 * @param  {string}  modesStr a comma-separated list of OTP modes
 * @return {boolean} whether any of the modes is a rental mode
 */

export function hasRental(modesStr) {
  return modesStr.split(",").some(function (mode) {
    return mode.indexOf("_RENT") > -1;
  });
}
export function getMapColor(mode) {
  mode = mode || this.get("mode");
  if (mode === "WALK") return "#444";
  if (mode === "BICYCLE") return "#0073e5";
  if (mode === "SUBWAY") return "#e60000";
  if (mode === "RAIL") return "#b00";
  if (mode === "BUS") return "#080";
  if (mode === "TRAM") return "#800";
  if (mode === "FERRY") return "#008";
  if (mode === "CAR") return "#444";
  if (mode === "MICROMOBILITY") return "#f5a729";
  return "#aaa";
} // TODO: temporary code; handle via migrated OTP i18n language table

export function getStepDirection(step) {
  switch (step.relativeDirection) {
    case "DEPART":
      return "Head ".concat(step.absoluteDirection.toLowerCase());

    case "LEFT":
      return "Left";

    case "HARD_LEFT":
      return "Hard left";

    case "SLIGHTLY_LEFT":
      return "Slight left";

    case "CONTINUE":
      return "Continue";

    case "SLIGHTLY_RIGHT":
      return "Slight right";

    case "RIGHT":
      return "Right";

    case "HARD_RIGHT":
      return "Hard right";

    case "CIRCLE_CLOCKWISE":
      return "Follow circle clockwise";

    case "CIRCLE_COUNTERCLOCKWISE":
      return "Follow circle counterclockwise";

    case "ELEVATOR":
      return "Take elevator";

    case "UTURN_LEFT":
      return "Left U-turn";

    case "UTURN_RIGHT":
      return "Right U-turn";

    default:
      return step.relativeDirection;
  }
}
export function getStepInstructions(step) {
  var conjunction = step.relativeDirection === "ELEVATOR" ? "to" : "on";
  return "".concat(getStepDirection(step), " ").concat(conjunction, " ").concat(step.streetName);
}
export function getStepStreetName(step) {
  if (step.streetName === "road") return "Unnamed Road";
  if (step.streetName === "path") return "Unnamed Path";
  return step.streetName;
}
export function toSentenceCase(str) {
  if (str == null) {
    return "";
  }

  str = String(str);
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}
/**
 * Derive the company string based on mode and network associated with leg.
 */

export function getCompanyFromLeg(leg) {
  if (!leg) return null;
  var from = leg.from,
      mode = leg.mode,
      rentedBike = leg.rentedBike,
      rentedCar = leg.rentedCar,
      rentedVehicle = leg.rentedVehicle,
      tncData = leg.tncData;

  if (mode === "CAR" && rentedCar) {
    return from.networks[0];
  }

  if (mode === "CAR" && tncData) {
    return tncData.company;
  }

  if (mode === "BICYCLE" && rentedBike && from.networks) {
    return from.networks[0];
  }

  if (mode === "MICROMOBILITY" && rentedVehicle && from.networks) {
    return from.networks[0];
  }

  return null;
}
export function getLegModeLabel(leg) {
  switch (leg.mode) {
    case "BICYCLE_RENT":
      return "Biketown";

    case "CAR":
      return leg.hailedCar ? "Ride" : "Drive";

    case "GONDOLA":
      return "Aerial Tram";

    case "TRAM":
      if (leg.routeLongName.toLowerCase().indexOf("streetcar") !== -1) return "Streetcar";
      return "Light Rail";

    case "MICROMOBILITY":
      return "Ride";

    default:
      return toSentenceCase(leg.mode);
  }
}
export function getItineraryBounds(itinerary) {
  var coords = [];
  itinerary.legs.forEach(function (leg) {
    var legCoords = polyline.toGeoJSON(leg.legGeometry.points).coordinates.map(function (c) {
      return [c[1], c[0]];
    });
    coords = [].concat(_toConsumableArray(coords), _toConsumableArray(legCoords));
  });
  return coords;
}
/**
 * Return a coords object that encloses the given leg's geometry.
 */

export function getLegBounds(leg) {
  var coords = polyline.toGeoJSON(leg.legGeometry.points).coordinates.map(function (c) {
    return [c[1], c[0]];
  }); // in certain cases, there might be zero-length coordinates in the leg
  // geometry. In these cases, build us an array of coordinates using the from
  // and to data of the leg.

  if (coords.length === 0) {
    coords.push([leg.from.lat, leg.from.lon], [leg.to.lat, leg.to.lon]);
  }

  return coords;
}
/* Returns an interpolated lat-lon at a specified distance along a leg */

export function legLocationAtDistance(leg, distance) {
  if (!leg.legGeometry) return null;

  try {
    var line = polyline.toGeoJSON(leg.legGeometry.points);
    var pt = turfAlong(line, distance, {
      units: "meters"
    });

    if (pt && pt.geometry && pt.geometry.coordinates) {
      return [pt.geometry.coordinates[1], pt.geometry.coordinates[0]];
    }
  } catch (e) {// FIXME handle error!
  }

  return null;
}
/* Returns an interpolated elevation at a specified distance along a leg */

export function legElevationAtDistance(points, distance) {
  // Iterate through the combined elevation profile
  var traversed = 0; // If first point distance is not zero, insert starting point at zero with
  // null elevation. Encountering this value should trigger the warning below.

  if (points[0][0] > 0) {
    points.unshift([0, null]);
  }

  for (var i = 1; i < points.length; i++) {
    var start = points[i - 1];
    var elevDistanceSpan = points[i][0] - start[0];

    if (distance >= traversed && distance <= traversed + elevDistanceSpan) {
      // Distance falls within this point and the previous one;
      // compute & return iterpolated elevation value
      if (start[1] === null) {
        console.warn("Elevation value does not exist for distance.", distance, traversed);
        return null;
      }

      var pct = (distance - traversed) / elevDistanceSpan;
      var elevSpan = points[i][1] - start[1];
      return start[1] + elevSpan * pct;
    }

    traversed += elevDistanceSpan;
  }

  console.warn("Elevation value does not exist for distance.", distance, traversed);
  return null;
} // Iterate through the steps, building the array of elevation points and
// keeping track of the minimum and maximum elevations reached

export function getElevationProfile(steps) {
  var unitConversion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var minElev = 100000;
  var maxElev = -100000;
  var traversed = 0;
  var gain = 0;
  var loss = 0;
  var previous = null;
  var points = [];
  steps.forEach(function (step) {
    if (!step.elevation || step.elevation.length === 0) {
      traversed += step.distance;
      return;
    }

    for (var i = 0; i < step.elevation.length; i++) {
      var elev = step.elevation[i];

      if (previous) {
        var diff = (elev.second - previous.second) * unitConversion;
        if (diff > 0) gain += diff;else loss += diff;
      }

      if (i === 0 && elev.first !== 0) {// console.warn(`No elevation data available for step ${stepIndex}-${i} at beginning of segment`, elev)
      }

      var convertedElevation = elev.second * unitConversion;
      if (convertedElevation < minElev) minElev = convertedElevation;
      if (convertedElevation > maxElev) maxElev = convertedElevation;
      points.push([traversed + elev.first, elev.second]); // Insert "filler" point if the last point in elevation profile does not
      // reach the full distance of the step.

      if (i === step.elevation.length - 1 && elev.first !== step.distance) {// points.push([traversed + step.distance, elev.second])
      }

      previous = elev;
    }

    traversed += step.distance;
  });
  return {
    maxElev: maxElev,
    minElev: minElev,
    points: points,
    traversed: traversed,
    gain: gain,
    loss: loss
  };
}
/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {string} text The text to be rendered.
 * @param {string} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */

export function getTextWidth(text) {
  var font = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "22px Arial";
  // re-use canvas object for better performance
  var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}
/**
 * Get the configured company object for the given network string if the company
 * has been defined in the provided companies array config.
 */

function getCompanyForNetwork(networkString) {
  var companies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var company = companies.find(function (co) {
    return co.id === networkString;
  });

  if (!company) {
    console.warn("No company found in config.yml that matches rented vehicle network: ".concat(networkString), companies);
  }

  return company;
}
/**
 * Get a string label to display from a list of vehicle rental networks.
 *
 * @param  {Array<string>} networks  A list of network ids.
 * @param  {Array<object>}  [companies=[]] An optional list of the companies config.
 * @return {string}  A label for use in presentation on a website.
 */


export function getCompaniesLabelFromNetworks(networks) {
  var companies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return networks.map(function (network) {
    return getCompanyForNetwork(network, companies);
  }).filter(function (co) {
    return !!co;
  }).map(function (co) {
    return co.label;
  }).join("/");
}
/**
 * Returns mode name by checking the vertex type (VertexType class in OTP) for
 * the provided place. NOTE: this is currently only intended for vehicles at
 * the moment (not transit or walking).
 *
 * TODO: I18N
 * @param  {string} place place from itinerary leg
 */

export function getModeForPlace(place) {
  switch (place.vertexType) {
    case "CARSHARE":
      return "car";

    case "VEHICLERENTAL":
      return "E-scooter";
    // TODO: Should the type change depending on bike vertex type?

    case "BIKESHARE":
    case "BIKEPARK":
      return "bike";
    // If company offers more than one mode, default to `vehicle` string.

    default:
      return "vehicle";
  }
}
export function getPlaceName(place, companies) {
  // If address is provided (i.e. for carshare station, use it)
  if (place.address) return place.address.split(",")[0];

  if (place.networks && place.vertexType === "VEHICLERENTAL") {
    // For vehicle rental pick up, do not use the place name. Rather, use
    // company name + vehicle type (e.g., SPIN E-scooter). Place name is often just
    // a UUID that has no relevance to the actual vehicle. For bikeshare, however,
    // there are often hubs or bikes that have relevant names to the user.
    var company = getCompanyForNetwork(place.networks[0], companies);

    if (company) {
      return "".concat(company.label, " ").concat(getModeForPlace(place));
    }
  } // Default to place name


  return place.name;
}
export function getTNCLocation(leg, type) {
  var location = leg[type];
  return "".concat(location.lat.toFixed(5), ",").concat(location.lon.toFixed(5));
}
export function calculatePhysicalActivity(itinerary) {
  var walkDuration = 0;
  var bikeDuration = 0;
  itinerary.legs.forEach(function (leg) {
    if (leg.mode.startsWith("WALK")) walkDuration += leg.duration;
    if (leg.mode.startsWith("BICYCLE")) bikeDuration += leg.duration;
  });
  var caloriesBurned = walkDuration / 3600 * 280 + bikeDuration / 3600 * 290;
  return {
    bikeDuration: bikeDuration,
    caloriesBurned: caloriesBurned,
    walkDuration: walkDuration
  };
}
/**
 * For a given fare component (either total fare or component parts), returns
 * an object with string formatters and the fare value (in cents).
 */

export function getTransitFare(fareComponent) {
  // Default values (if fare component is not valid).
  var digits = 2;
  var transitFare = 0;
  var symbol = "$";
  var currencyCode = "USD";

  if (fareComponent) {
    // Assign values without declaration. See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#assignment_without_declaration
    var _fareComponent$curren = fareComponent.currency;
    currencyCode = _fareComponent$curren.currencyCode;
    digits = _fareComponent$curren.defaultFractionDigits;
    symbol = _fareComponent$curren.symbol;
    transitFare = fareComponent.cents;
  } // For cents to string conversion, use digits from fare component.


  var centsToString = function centsToString(cents) {
    var dollars = (cents / Math.pow(10, digits)).toFixed(digits);
    return "".concat(symbol).concat(dollars);
  }; // For dollars to string conversion, assume we're rounding to two digits.


  var dollarsToString = function dollarsToString(dollars) {
    return "".concat(symbol).concat(dollars.toFixed(2));
  };

  return {
    centsToString: centsToString,
    currencyCode: currencyCode,
    dollarsToString: dollarsToString,
    transitFare: transitFare
  };
}
/**
 * For an itinerary, calculates the transit/TNC fares and returns an object with
 * these values, currency info, as well as string formatters.
 * It is assumed that the same currency is used for transit and TNC legs.
 *
 * multiple being set to true will change the output behavior:
 * - dollarsToString and centsToString will be returned as part of each fare
 * - currencyCode will be returned separately for each fare
 * - tnc currency code will be returned separately
 * - each fare type will be returned separately within a new transitFares property
 *
 * FIXME: a new approach to fare calculation must be found:
 * the current approach is not sustainable, as centsToString and DollarsToString
 * must be replaced by i18n anyway.
 *
 * However, the current behavior should ideally be kept to avoid a breaking change.
 * The "multiple" mode is helpful, but only prevents tnc fare calculation from being duplicated.
 * This method could be split out into a new one, along with tnc fare calculation.
 * If this is done, the individual fare calculation should also be modified to support
 * a default fare not being called "regular". However, this again would be a breaking change.
 * This breaking change is avoided by adding the "multiple" parameter.
 *
 * When centsToString and dollarsToString are removed, this method should be split into
 * individual fare calculation on a variable fare key, fare calculation of an entire leg,
 * which will get fares for every fare key in the leg, and a method to calculate the fare of
 * a tnc ride within the leg. This will make typescripting easier, as the types will be cleaner.
 */

export function calculateFares(itinerary) {
  var multiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // Process any TNC fares
  var minTNCFare = 0;
  var maxTNCFare = 0;
  var tncCurrencyCode;
  itinerary.legs.forEach(function (leg) {
    if (leg.mode === "CAR" && leg.hailedCar && leg.tncData) {
      var _leg$tncData = leg.tncData,
          currency = _leg$tncData.currency,
          maxCost = _leg$tncData.maxCost,
          minCost = _leg$tncData.minCost; // TODO: Support non-USD

      minTNCFare += minCost;
      maxTNCFare += maxCost;
      tncCurrencyCode = currency;
    }
  });

  if (multiple) {
    // Return object of fares
    var transitFares = {};

    if (itinerary && itinerary.fare && itinerary.fare.fare) {
      Object.keys(itinerary.fare.fare).forEach(function (fareKey) {
        var fareComponent = itinerary.fare.fare[fareKey];
        transitFares[fareKey] = getTransitFare(fareComponent);
      });
    }

    return {
      maxTNCFare: maxTNCFare,
      minTNCFare: minTNCFare,
      tncCurrencyCode: tncCurrencyCode,
      transitFares: transitFares
    };
  } // Extract fare total from itinerary fares.


  var fareComponent = itinerary.fare && itinerary.fare.fare && itinerary.fare.fare.regular; // Get string formatters and itinerary fare.

  var _getTransitFare = getTransitFare(fareComponent),
      centsToString = _getTransitFare.centsToString,
      transitCurrencyCode = _getTransitFare.currencyCode,
      dollarsToString = _getTransitFare.dollarsToString,
      transitFare = _getTransitFare.transitFare;

  return {
    centsToString: centsToString,
    currencyCode: transitCurrencyCode || tncCurrencyCode,
    dollarsToString: dollarsToString,
    maxTNCFare: maxTNCFare,
    minTNCFare: minTNCFare,
    transitFare: transitFare
  };
}
export function getTimeZoneOffset(itinerary) {
  if (!itinerary.legs || !itinerary.legs.length) return 0; // Determine if there is a DST offset between now and the itinerary start date

  var dstOffset = new Date(itinerary.startTime).getTimezoneOffset() - new Date().getTimezoneOffset();
  return itinerary.legs[0].agencyTimeZoneOffset + (new Date().getTimezoneOffset() + dstOffset) * 60000;
}
//# sourceMappingURL=itinerary.js.map