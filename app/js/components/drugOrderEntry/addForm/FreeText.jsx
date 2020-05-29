import React from 'react';
import PropTypes from 'prop-types';

const FreeText = ({
  fieldErrors,
  fields,
  options,
  handleChange,
  handleSubmit,
  handleCancel,
  handleValidation,
  activateSaveButton,
}) => {
  const { drugInstructions, dispensingQuantity, dispensingUnit } = fields;
  return (
    <div>
      <form>
        <div className="flex-row">
          <div>
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
        <div className="flex-row">
          <div>
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
                value={dispensingQuantity} />
              {
                fieldErrors.dispensingQuantity ?
                  <span className="field-error">Required</span>
                  : ""
              }
            </p>
            <p className="left">
              <input
                className={(dispensingQuantity && !dispensingUnit) ? "illegalValue" : ""}
                placeholder="Units"
                name="dispensingUnit"
                id="drugDispensingUnits"
                list="dispensingUnits"
                size="20"
                value={dispensingUnit}
                onBlur={handleValidation}
                onChange={handleChange} />
              <datalist id="dispensingUnits" >
                {
                  options.dispensingUnit &&
                    options.dispensingUnit.map(unit =>
                      (
                        <option key={unit.uuid} value={unit.display} />
                      ))
                }
              </datalist>
              {
                (dispensingQuantity && !dispensingUnit) &&
                  <span className="field-error">Required</span>
              }
            </p>
          </div>
        </div>
        <div className="flex-row">
          <div>
            <button
              type="button"
              className="cancel"
              onClick={handleCancel}
            >
            Cancel
            </button>
          </div>
          <div className="column-1">
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
  options: PropTypes.object,
  handleCancel: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

FreeText.defaultProps = {
  options: {},
};

export default FreeText;
