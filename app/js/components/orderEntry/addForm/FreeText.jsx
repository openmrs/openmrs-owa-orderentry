import React from 'react';
import PropTypes from 'prop-types';

const FreeText = ({
  fields,
  allConfigurations,
  handleChange,
  handleSubmit,
}) => {
  const { completeInstructions, dispensingQuantity, dispensingUnit } = fields;
  return (
    <div>
      <form>
        <div>
          <div>
            <label name="instructions">Complete Instructions</label>
            <textarea
              id="instructions"
              name="completeInstructions"
              value={completeInstructions}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div>
              <label>Dispense:</label>
            </div>
            <div>
              <label name="Quantity">Dose</label>
              <input
                type="number"
                id="Quantity"
                name="dispensingQuantity"
                min="0"
                value={dispensingQuantity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label name="dispenseUnits">Units</label>
              <input
                type="search"
                id="dispenseUnits"
                name="dispensingUnit"
                list="units"
                size="10"
                value={dispensingUnit}
                onChange={handleChange}
                required />
              <datalist id="units" >
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
            </div>
          </div>
          <div>
            <input type="button" className="button cancel" value="Cancel" />
            <input type="button" onClick={handleSubmit} className="button confirm right" value="Save" />
          </div>
        </div>
      </form>
    </div>
  );
};

FreeText.propTypes = {
  fields: PropTypes.object.isRequired,
  allConfigurations: PropTypes.shape({
    drugDispensingUnits: PropTypes.array,
  }),
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

FreeText.defaultProps = {
  allConfigurations: {},
};

export default FreeText;
