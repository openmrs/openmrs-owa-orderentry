import React from 'react';
import '../../../../css/grid.scss';

const StandardDose = () => (
  <div>
    <form className="simple-form-ui">
      <div className="grid-row">
        <div className="column-1">
          <label name="dose">Dose</label>
          <input
            className="number-input"
            id="dose"
            name="dose"
            type="number"
            min="0"
            required
            autoFocus />
        </div>
        <div className="column-2">
          <label name="drugDosingUnits">Units</label>
          <input
            id="drugDosingUnits"
            name="dosingUnit"
            list="dosingUnits"
            size="10"
            required />
          <datalist id="dosingUnits" >
            <option value="Kilograms" />
            <option value="grams" />
            <option value="milligrams" />
          </datalist>
        </div>
        <div className="column-2">
          <label name="frequency">Frequency</label>
          <input
            id="frequency"
            name="frequency"
            list="orderFrequencies"
            size="10"
          />
          <datalist id="orderFrequencies" >
            <option value="Daily" />
            <option value="Twice everyday" />
            <option value="Twice a month" />
          </datalist>
        </div>
        <div className="column-2">
          <label name="route">Route</label>
          <input
            id="route"
            name="route"
            list="routes"
            size="10"
          />
          <datalist id="routes" >
            <option value="Orally" />
            <option value="Eye drops" />
            <option value="Ear drops" />
          </datalist>
        </div>
        <div className="column-1">
          <label name="duration">Duration</label>
          <input
            className="number-input"
            id="duration"
            name="duration"
            type="number"
            min="0"
          />
        </div>
        <div className="column-2">
          <label name="drugDurationUnits">Units</label>
          <input
            name="durationUnit"
            id="drugDurationUnits"
            list="durationUnits"
            size="10"
          />
          <datalist id="durationUnits" >
            <option value="Weeks" />
            <option value="Months" />
            <option value="Years" />
          </datalist>
        </div>
      </div>
      <div className="grid-row">
        <p className="left column-4">
          <label name="reason">As needed</label>
          <input
            name="reason"
            id="reason"
            type="text"
          />
        </p>
        <div className="column-1">
          <label>Dispense: </label>
        </div>
        <div className="column-1">
          <label name="dispenseQuantity">Quantity</label>
          <input
            className="number-input"
            name="dispensingQuantity"
            id="dispenseQuantity"
            type="number"
            min="0"
          />
        </div>
        <div className="column-2">
          <label name="drugDispensingUnits">Units</label>
          <input
            name="dispensingUnit"
            id="drugDispensingUnits"
            list="dispensingUnits"
            size="10"
          />
          <datalist id="dispensingUnits" >
            <option value="Tablets" />
            <option value="Bottles" />
            <option value="Tins" />
          </datalist>
        </div>
      </div>
      <div className="grid-row">
        <div className="column-4">
          <label name="notes">Notes</label>
          <textarea
            rows="2"
            cols="85"
            id="notes"
            name="note"
          />
        </div>
      </div>
      <div className="button-row">
        <div className="column-1">
          <button
            className="cancel"
          >
          Cancel
          </button>
        </div>
        <div className="column-1 pull-right-8">
          <button
            className="confirm"
          >
          Save
          </button>
        </div>
      </div>
    </form>
  </div>
);

export default StandardDose;
