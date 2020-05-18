import React from 'react';
import PastOrder from '../../../app/js/components/drugOrderEntry/PastOrder';

const props = {
  dosingType: 'org.openmrs.SimpleDosingInstructions',
  drug: { display: 'new drug' },
  doseUnits: { display: 'drops' },
  frequency: { display: 'twice a week' },
  route: { display: 'reactally' },
  quantityUnits: { display: 'drops' },
  durationUnits: { display: 'weeks' },
  dateActivated: '2018-May-20 10:59',
  dateStopped: '2018-May-20 10:59',
  autoExpireDate: '2018-May-20 10:59',
  action: '',
  dateFormat: 'YYYY-MMM-DD',
}

describe('<PastOrder />', () => {
  it('should render component', () => {
    const wrapper = shallow(<PastOrder {...props}/>);
    expect(wrapper).toMatchSnapshot()
  });

  it('should render details', () => {
    const customProps = {
      dosingType: '',
      ...props
    }
    const wrapper = shallow(<PastOrder {...customProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
