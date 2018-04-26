import React from 'react';

import DraftDataTable from '../../../../app/js/components/orderEntry/addForm/DraftDataTable';

const props = {
    fields: {},
    draftOrders: [{}]
};

describe('Draft Data Table', () => {
  it('should render component', () => {
    const wrapper = shallow(<DraftDataTable {...props} />  );
    expect(wrapper).toMatchSnapshot()
  });
});
