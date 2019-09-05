import React from 'react';
import { isEditable, isCancellable } from "../../app/js/utils/helpers";


describe('Helper functions', () => {

  it('isEditable should return true for drug orders', () => {

    const order = {
      type: 'drugorder'
    };

    expect(isEditable(order)).toBeTruthy();
  });

  it('isEditable should return false for lab orders', () => {

    const order = {
      type: 'testorder'
    };

    expect(isEditable(order)).toBeFalsy();
  });

  it('isEditable should return false for unknown order type', () => {

    const order = {};

    expect(isEditable(order)).toBeFalsy();
  });

  it('isCancellable should return true for drug orders', () => {

    const order = {
      type: 'drugorder'
    };

    expect(isCancellable(order)).toBeTruthy();
  });

  it('isCancellable should return true for lab orders with no fulfiller status', () => {

    const order = {
      type: 'testorder'
    };

    expect(isCancellable(order)).toBeTruthy();
  });

  it('isCancellable should return true for lab orders with RECEIVED fulfiller status', () => {

    const order = {
      type: 'testorder',
      fulfillerStatus: 'RECEIVED'
    };

    expect(isCancellable(order)).toBeTruthy();
  });

  it('isCancellable should return true for lab orders with EXCEPTION fulfiller status', () => {

    const order = {
      type: 'testorder',
      fulfillerStatus: 'EXCEPTION'
    };

    expect(isCancellable(order)).toBeTruthy();
  });

  it('isCancellable should return false for lab orders with IN_PROGRESS fulfiller status', () => {

    const order = {
      type: 'testorder',
      fulfillerStatus: 'IN_PROGRESS'
    };

    expect(isCancellable(order)).toBeFalsy();
  });

  it('isCancellable should return false for lab orders with COMPLETED fulfiller status', () => {

    const order = {
      type: 'testorder',
      fulfillerStatus: 'COMPLETED'
    };

    expect(isCancellable(order)).toBeFalsy();
  })


});
