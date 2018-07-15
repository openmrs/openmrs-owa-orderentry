import React from 'react';
import ConnectedPatientDashboard, {
  Dashboard
} from '../../../app/js/components/patientDashboard';

let props;
let mountedComponent;

const getComponent = () => {
  if (!mountedComponent) {
    mountedComponent = shallow(<Dashboard {...props} />);
  }
  return mountedComponent;
};

describe('Component: PatientDashboard', () => {
  beforeEach(() => {
    props = {
      location: {
        search: '?patient=6ecsd-jdfn-sdfdf'
      },
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
      fetchPatientRecord: jest.fn(),
      fetchPatientNote: jest.fn(),
      currentOrderTypeText: '',
    };
    mountedComponent = undefined;
  });

  it('should render properly', () => {
    const component = getComponent();
    expect(component).toMatchSnapshot();
  });

  describe('toggleDetailsView() method', () => {
    it('should call toggleDetailsView()', () => {
      sinon.spy(getComponent().instance(), 'toggleDetailsView');
      getComponent().instance().toggleDetailsView();
      expect(getComponent().instance().toggleDetailsView.calledOnce)
        .toEqual(true);
    });
  });

  describe('Connected PatientDashboard component', () => {
    it('component successfully rendered', () => {
      const store = mockStore({
        patientReducer: {
          patient: { display: "Amani Hospital" },
        },
        noteReducer: {
          note: []
        },
      });
      const wrapper = shallow(<ConnectedPatientDashboard store={store} {...props}/>);
      expect(wrapper.length).toBe(1);
    });
  });
});
