import React from 'react';
import PropTypes from 'prop-types';

const FreeText = ({
  fieldErrors,
  careSetting,
  fields,
  allConfigurations,
  handleChange,
  handleSubmit,
  handleCancel,
  handleValidation,
  activateSaveButton,
}) => {
  const { drugInstructions, dispensingQuantity, dispensingUnit } = fields;
  return (
    <div>
      <form className="simple-form-ui">
        <div className="grid-row">
          <div className="column-6">
            <label name="notes">Complete Instructions</label>
            <textarea
              rows="4"
              cols="80"
              id="notes"
              name="drugInstructions"
              value={drugInstructions}
              onChange={handleChange}
            />
          </div>
        </div>
        {(careSetting.display === "Outpatient") &&
          <div className="grid-row">
            <div className="column-7">
              <label>For outpatient orders </label>
              <p className="left label-margin">
                <label>Dispense:</label>
              </p>
              <p className="left p-margin">
                <input
                  className={`medium-input ${fieldErrors.dispensingQuantity && "illegalValue"}`}
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
                  className={(fields.dispensingQuantity && !fields.dispensingUnit) ? "illegalValue" : ""}
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
                    allConfigurations &&
                    (
                      allConfigurations.drugDispensingUnits &&
                    allConfigurations.drugDispensingUnits.map(unit =>
                      (
                        <option key={unit.uuid} value={unit.display} />
                      ))
                    )
                  }
                </datalist>
                {
                  (fields.dispensingQuantity && !fields.dispensingUnit) &&
                    <span className="field-error">Required</span>
                }
              </p>
            </div>
          </div>}
        <br />
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
              disabled={activateSaveButton()}
            >
            Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

FreeText.propTypes = {
  fieldErrors: PropTypes.object.isRequired,
  handleValidation: PropTypes.func.isRequired,
  activateSaveButton: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  allConfigurations: PropTypes.shape({
    drugDispensingUnits: PropTypes.array,
  }),
  handleCancel: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  careSetting: PropTypes.shape({
    display: PropTypes.string,
  }).isRequired,
};

FreeText.defaultProps = {
  allConfigurations: {},
};

export default FreeText;
