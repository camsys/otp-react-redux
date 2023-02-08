import CSS from "csstype";
import { ReactElement } from "react";
import type { QueryParamChangeEvent } from "../types";
declare type DepartArriveValue = "NOW" | "DEPART" | "ARRIVE";
interface DateTimeSelectorProps {
    /**
     * The CSS class name(s) to apply to this element.
     */
    className?: string;
    /**
     * The initial departure/arrival date string, in a format that an HTML <input type="date"> control can render.
     */
    date?: string;
    /**
     * The date format string for legacy mode (on legacy browsers, or if `forceLegacy` is true).
     */
    dateFormatLegacy?: string;
    /**
     * The initial setting determining whether a trip should start or end at a given time.
     */
    departArrive?: DepartArriveValue;
    /**
     * If true, forces legacy mode and uses `<input type="text">`
     * instead of the native date/time pickers found on modern browsers.
     */
    forceLegacy?: boolean;
    /**
     * Triggered when a query parameter is changed.
     * @param params A { param1: value1, param2, value2, ... } object that contains the new values for the parameter(s) that has (have) changed.
     */
    onQueryParamChange: (e: QueryParamChangeEvent) => void;
    /**
     * Standard React inline style prop.
     */
    style?: CSS.Properties;
    /**
     * The initial departure/arrival time string, in a format that an HTML <input type="time"> control can render.
     */
    time?: string;
    /**
     * The time format string for legacy mode (on legacy browsers, or if `forceLegacy` is true).
     */
    timeFormatLegacy?: string;
}
/**
 * The `DateTimeSelector` component lets the OTP user chose a departure or arrival date/time.
 * (The departure can be right now.)
 *
 * There are two rendering modes, a "normal" mode and a "legacy" mode.
 * - "Normal" mode: We try to use `<input type="time|date">` for date and time input.
 *   On current HTML5 browsers (desktop or mobile), these controls
 *   render the date/time according to OS settings and natively offer a user interface
 *   for choosing the date/time.
 *   Thus, when `<input type="time|date">` is supported, there is no need to specify a date/time format.
 *   If not, we fall back to "legacy" mode.
 * - "Legacy" mode: On Safari for MacOS, and on legacy browsers that don't support `<input type="time|date">`,
 *   `<input type="time|date">` renders as the default `<input type="text">`, and in these conditions,
 *   we have to fall back to formatting the date/time ourselves, using `dateFormatLegacy` and `timeFormatLegacy` props.
 * - Implementers don't know in advance whether the browser supports `<input type="time|date">`.
 *   That determination is performed by method `isInputTypeSupported(type)` above when the constructor is executed.
 *   Therefore, they should provide `dateFormatLegacy` and `timeFormatLegacy` props as a backup.
 *   If these props are not provided, the OTP API date format is used.
 * - For testing purposes, implementers can "force" the "legacy" mode by setting the `forceLegacy` prop to true.
 */
export default function DateTimeSelector({ className, date, dateFormatLegacy, departArrive, forceLegacy, onQueryParamChange, style, time, timeFormatLegacy }: DateTimeSelectorProps): ReactElement;
export {};
//# sourceMappingURL=index.d.ts.map