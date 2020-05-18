import React from 'react';
import { Draft } from '../../app/js/components/Draft';
import { mountWithIntl } from '@openmrs/react-components';

let props;
let mountedComponent;

props = {
  draftOrders: [
    { uuid: 6, display: 'hermatocrite', set: true, type: 'laborder',
      names: [
        {
          "id": 13207,
          "uuid": "0b7ba816-15f5-102d-96e4-000c29c2a5d7",
          "name": "Hct",
          "locale": "en",
          "localePreferred": false,
          "voided": false,
          "conceptNameType": "SHORT"
        },
        {
          "id": 13204,
          "uuid": "3e148d20-26fe-102b-80cb-0017a47871b2",
          "name": "Hematocrit",
          "locale": "en",
          "localePreferred": true,
          "voided": false,
          "conceptNameType": "FULLY_SPECIFIED"
        },
      ],
    }
  ],
  handleSubmit: jest.fn(),
  handleDraftDiscard: jest.fn(),
  toggleDraftLabOrderUrgency: jest.fn(),
  editDraftDrugOrder: jest.fn(),
  locale: 'en',
};

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = mountWithIntl(<Draft {...props} />);
  }
  return mountedComponent;
};

describe('Component: Draft', () => {
  beforeEach(() => {
    mountedComponent = undefined;
  });

  it('should render on initial setup', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  it('should display the action buttons', () => {
    const component = getComponent();
    const actionButton = component.find('.action-btn');
    expect(actionButton.length).toEqual(2);
  });

  it('Should be able to display drug data to the list', () => {
    const component = getComponent();
    component.setProps({ draftOrders: [
      { uuid: 6, drugName: 'paracetamol' }
    ]});
    const draftName = component.find('.draft-name');
    expect(draftName.exists()).toBeTruthy();
    expect(draftName.props().children).toEqual('paracetamol');
  });

  it('Should simulate the discard event', () => {
    const component = getComponent();
    component.setProps({
      draftOrders: [
      { uuid: 6, drugName: 'paracetamol' },
      { uuid: 7, display: 'hermatology', action: 'NEW', type: 'drugorder',
        names: [
          {
            "id": 13207,
            "uuid": "0b7ba816-15f5-102d-96e4-000c29c2a5d7",
            "name": "Hct",
            "locale": "en",
            "localePreferred": false,
            "voided": false,
            "conceptNameType": "SHORT"
          },
          {
            "id": 13204,
            "uuid": "3e148d20-26fe-102b-80cb-0017a47871b2",
            "name": "Hematocrit",
            "locale": "en",
            "localePreferred": true,
            "voided": false,
            "conceptNameType": "FULLY_SPECIFIED"
          },
        ],
      }
    ],
    locale: 'en'
    });
    const discardButton = component.find('#draft-discard-all');
    discardButton.simulate('click', {});
    expect(props.handleDraftDiscard).toBeCalled();
  });

  it('trigggers handleSubmit props when the submit button is clicked', () => {
    const component = getComponent();
    const submitButton = component.find('.confirm')
    submitButton.simulate('click');
    expect(props.handleSubmit).toBeCalled();
  });

  
});

