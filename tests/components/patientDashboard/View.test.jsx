import React from 'react';
import { shallow } from 'enzyme';
import View from '../../../app/js/components/patientDashboard/View';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<View {...props} />);
  }
  return mountedComponent;
};

describe('Component: PatientDashBoard: View', () => {
  beforeEach(() => {
    props = {
      isLoading: false,
      patient: {
        person: {
          personName: {
            givenName: 'Larrystone',
            middleName: 'Katz',
            familyName: 'Larrystone'
          },
          preferredAddress: {
            display: 'My Address'
          },
          gender: 'M',
          age: '19'
        },
        patientIdentifier: {
          identifier: '2001A'
        },
        attributes: [{
          value: '0801000000'
        }]
      },
      note: [{
        value: "Healthy guy",
        auditInfo: {
          creator: {
            display: "admin"
          },
          dateCreated: new Date()
        }
      }],
      showContactInfo: true,
      toggleDetailsView: jest.fn(),
      showContactInfo: true,
    };
    mountedComponent = undefined;
  });

  describe('Conditional rendering', () => {
    it('renders properly', () => {
      const component = getComponent();
      expect(component).toMatchSnapshot();
    });

    it('show Female as gender and hide Address/Phone details', () => {
      props.showContactInfo = false,
        props.patient = {
          person: {
            personName: {
              givenName: 'Larrystone',
              middleName: 'Katz',
              familyName: 'Larrystone'
            },
            preferredAddress: {
              display: 'My Address'
            },
            gender: 'F',
            age: '19'
          },
          patientIdentifier: {
            identifier: '2001A'
          },
          attributes: [{
            value: '0801000000'
          }]
        }
      const component = getComponent();

      expect(component.find('.gender-age > span').first().props().children[0]).toBe('Female');
      expect(component.find('.gender-age a span').first().props().children[0]).toBe('Show contact info ');
    });
  });

  describe('Show details toggle', () => {
    it('calls toggleDetailsView()', () => {
      const toggleDetailsViewSpy = jest.spyOn(props, 'toggleDetailsView');
      const showDetailsLink = getComponent().find('.gender-age a').at(1);
      showDetailsLink.simulate('click');

      expect(toggleDetailsViewSpy).toHaveBeenCalledTimes(1);
    });
  });
});
