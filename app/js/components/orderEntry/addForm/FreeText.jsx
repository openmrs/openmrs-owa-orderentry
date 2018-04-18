import React from 'react';
import PropTypes from 'prop-types';

const FreeText = ({
  fields,
  allConfigurations,
  handleChange,
  handleSubmit,
  handleCancel,
}) => {
  const { drugInstructions, dispensingQuantity, dispensingUnit } = fields;
  return (
    <div>
      <form>
        <div>
          <div>
            <label name="instructions">Complete Instructions</label>
            <textarea
              id="instructions"
              name="drugInstructions"
              value={drugInstructions}
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
            <input type="button" onClick={handleCancel} className="button cancel" value="Cancel" />
            <input type="button" onClick={handleSubmit} className="button confirm right" value="Save" />
          </div>
        </div>
      </form>
    </div>
  );
};

FreeText.propTypes = {
  fields: PropTypes.object.isRequired,
  allConfigurations: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default FreeText;
