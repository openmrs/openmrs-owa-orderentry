import React from 'react';
import PropTypes from 'prop-types';
import '../../../../css/grid.scss';

const StandardDose = ({
  fields,
  fieldErrors,
  careSetting,
  options,
  handleChange,
  handleValidation,
  activateSaveButton,
  handleSubmit,
  handleCancel,
}) => {
  const {
    dosingUnit, frequency, route, durationUnit, dispensingUnit,
  } = options;
  return (
    <div>
      <form className="simple-form-ui">
        <div className="grid-row">
          <div className="column-10">
            <p className="left p-margin">
              <input
                className={`small-input ${fieldErrors.dose ? "illegalValue" : ""}`}
                placeholder="Dose"
                id="dose"
                name="dose"
                type="number"
                min="0"
                onBlur={handleValidation}
                onChange={handleChange}
                value={fields.dose}
                required
              />
              {
                fieldErrors.dose ?
                  <span className="field-error">Required</span>
                  : ""
              }
            </p>
            <p className="left p-margin">
              <input
                className={fields.dose && !fields.dosingUnit ? "illegalValue" : ""}
                placeholder="Units"
                id="drugDosingUnits"
                name="dosingUnit"
                list="dosingUnits"
                size="7"
                value={fields.dosingUnit}
                onBlur={handleValidation}
                onChange={handleChange}
                required />
              <datalist id="dosingUnits" >
                {
                  dosingUnit && dosingUnit.map(unit => (
                    <option
                      key={unit.uuid}
                      value={unit.display}
                    />))
                }
              </datalist>
              {
                (fields.dose && !fields.dosingUnit) ?
                  <span className="field-error">Required</span>
                  : ""
              }
            </p>
            <p className="left p-margin">
              <input
                className={fieldErrors.frequency ? "illegalValue" : ""}
                placeholder="Frequency"
                id="frequency"
                name="frequency"
                list="orderFrequencies"
                size="20"
                value={fields.frequency}
                onBlur={handleValidation}
                onChange={handleChange} />
              <datalist id="orderFrequencies" >
                {
                  frequency && frequency.map(frequencyOption => (
                    <option
                      key={frequencyOption.uuid}
                      value={frequencyOption.display}
                    />
                  ))
                }
              </datalist>
              {
                fieldErrors.frequency ?
                  <span className="field-error">Required</span>
                  : ""
              }
            </p>
            <p className="left p-margin">
              <input
                className={fieldErrors.route ? "illegalValue" : ""}
                placeholder="Route"
                id="route"
                name="route"
                list="routes"
                size="20"
                value={fields.route}
                onBlur={handleValidation}
                onChange={handleChange} />
              <datalist id="routes" >
                {
                  route && route.map(routeOption => (
                    <option
                      key={routeOption.uuid}
                      value={routeOption.display}
                    />))
                }
              </datalist>
              {
                fieldErrors.route ?
                  <span className="field-error">Required</span>
                  : ""
              }
            </p>
          </div>
        </div>
        <div className="grid-row">
          <div className="column-7">
            <p className="left label-margin">
              <label name="reason">As needed for</label>
            </p>
            <p className="left">
              <input
                name="reason"
                placeholder="reason(optional)"
                id="reason"
                type="text"
                size="30"
                onChange={handleChange}
                value={fields.reason} />
            </p>
          </div>
        </div>
        <div className="grid-row">
          <div className="column-7">
            <p className="left label-margin">
              <label>For</label>
            </p>
            <p className="left p-margin">
              <input
                className="medium-input"
                placeholder="Duration"
                id="duration"
                name="duration"
                type="number"
                min="0"
                onChange={handleChange}
                value={fields.duration} />
            </p>
            <p className="left label-margin">
              <input
                className={fields.duration && !fields.durationUnit ? "illegalValue" : ""}
                placeholder="Units"
                name="durationUnit"
                id="drugDurationUnits"
                list="durationUnits"
                size="8"
                value={fields.durationUnit}
                onBlur={handleValidation}
                onChange={handleChange} />
              <datalist id="durationUnits" >
                {
                  durationUnit && durationUnit.map(unit => (
                    <option
                      key={unit.uuid}
                      value={unit.display}
                    />
                  ))
                }
              </datalist>
              {
                (fields.duration && !fields.durationUnit) ?
                  <span className="field-error">Required</span>
                  : ""
              }
            </p>
            <p className="left">
              <label>total</label>
            </p>
          </div>
        </div>
        <div className="grid-row">
          <div className="column-6">
            <textarea
              rows="2"
              cols="60"
              id="notes"
              placeholder="Additional instruction not covered above"
              name="drugInstructions"
              onChange={handleChange}
              value={fields.drugInstructions} />
          </div>
        </div>
        { careSetting.display === 'Outpatient' ?
          <div className="grid-row">
            <div className="column-7">
              <label>For outpatient orders </label>
              <p className="left label-margin">
                <label>Dispense:</label>
              </p>
              <p className="left p-margin">
                <input
                  className={`medium-input ${fieldErrors.dispensingQuantity ? "illegalValue" : ""}`}
                  placeholder="Quantity"
                  name="dispensingQuantity"
                  id="dispenseQuantity"
                  type="number"
                  min="0"
                  onBlur={handleValidation}
                  onChange={handleChange}
                  value={fields.dispensingQuantity} />
                {
                  fieldErrors.dispensingQuantity ?
                    <span className="field-error">Required</span>
                    : ""
                }
              </p>
              <p className="left">
                <input
                  className={fields.dispensingQuantity && !fields.dispensingUnit ? "illegalValue" : ""}
                  placeholder="Units"
                  name="dispensingUnit"
                  id="drugDispensingUnits"
                  list="dispensingUnits"
                  size="8"
                  value={fields.dispensingUnit}
                  onBlur={handleValidation}
                  onChange={handleChange} />
                <datalist id="dispensingUnits" >
                  {
                    dispensingUnit && dispensingUnit.map(unit => (
                      <option
                        key={unit.uuid}
                        value={unit.display}
                      />))
                  }
                </datalist>
                {
                  (fields.dispensingQuantity && !fields.dispensingUnit) ?
                    <span className="field-error">Required</span>
                    : ""
                }
              </p>
            </div>
          </div> :
          <br />
        }
        <div className="grid-row">
          <div className="column-1">
            <button
              type="button"
              className="cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          <div className="column-1 pull-right-8">
            <button
              type="button"
              className="confirm"
              onClick={handleSubmit}
              disabled={activateSaveButton()}>
                Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

StandardDose.propTypes = {
  fields: PropTypes.object.isRequired,
  fieldErrors: PropTypes.object.isRequired,
  careSetting: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleValidation: PropTypes.func.isRequired,
  activateSaveButton: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default StandardDose;
