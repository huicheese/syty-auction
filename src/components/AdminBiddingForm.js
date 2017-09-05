import React from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import NotificationCentreContainer from '../containers/NotificationCentreContainer'

const AdminBiddingForm = props => {
  const { handleSubmit, pristine, reset, bidRequested } = props;
  return (
    <form className="login-form admin-form" onSubmit={handleSubmit}>
      <NotificationCentreContainer />
      <div>
        <label>First Name</label>
        <div>
          <Field className="admin-field" name="firstName" component="input" type="text" placeholder="First Name"/>
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field className="admin-field" name="lastName" component="input" type="text" placeholder="Last Name"/>
        </div>
      </div>
      <div>
        <label>Company</label>
        <div>
          <Field className="admin-field" name="company" component="input" type="text" placeholder="Company"/>
        </div>
      </div>
      <div>
        <label>Table</label>
        <div>
          <Field className="admin-field" name="table" component="input" type="number" placeholder="Table Number"/>
        </div>
      </div>
      <div>
        <label>Slot</label>
        <div>
          <Field className="admin-field" name="slot" component="input" type="number" placeholder="Slot #"/>
        </div>
      </div>
      <div>
        <label>Amount</label>
        <div>
          <Field className="admin-field" name="amount" component="input" type="number" placeholder="Please input your bid"/>
        </div>
      </div>
        <br/>
        <br/>
        <br/>
        <br/>

      <div>
        <button type="submit" disabled={pristine || bidRequested}>Submit</button>
      </div>
    </form>
    );
};

export default reduxForm({
  form: 'adminBidding',
})(AdminBiddingForm);