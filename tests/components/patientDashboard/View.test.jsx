import React from 'react';
import View from '../../../app/js/components/patientDashboard/View';

const { attributes } = mockData;

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
      attributes,
      patient: {
        person: {
          personName: {
            givenName: 'Larrystone',
            middleName: 'Katz',
            familyName: 'Larrystone'
          },
          preferredAddress: {
            display: 'My Address',
            cityVillage: 'A city',
            stateProvince: 'A province',
            country: 'Kenya',
            postalCode: "09876"
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
          ...props.patient,
          person: {
            personName: {
              givenName: 'Larrystone',
              middleName: 'Katz',
              familyName: 'Larrystone'
            },
            gender: 'F',
            age: '19'
          },
        }
      const component = getComponent();

      expect(component.find('.gender-age > span').first().props().children[0]).toBe('Female');
      expect(component.find('.gender-age a span').first().props().children[0]).toBe('Show contact info ');
    });

    it('show only user address', () => {
      props.showContactInfo = true,
        props.patient = {
          ...props.patient,
        }
      const component = getComponent();
      expect(component.find('.contact-info-inline span').first().props().children[0]).toBe('My Address');
      expect(component.find('.contact-info-inline span').first().props().children[1]).toBe(' , A city');
      expect(component.find('.contact-info-inline span').first().props().children[2]).toBe(',A province');
      expect(component.find('.contact-info-inline span').first().props().children[3]).toBe(',Kenya');
      expect(component.find('.contact-info-inline span').first().props().children[4]).toBe(',09876');
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
