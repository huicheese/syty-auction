import { connect } from 'react-redux'
import { fetchLogin } from '../actions'
import LoginForm from '../components/LoginForm'

function mapStateToProps(state) {
  return {
    loginRequested: state.user.loginRequested || false
  };
}

function mapDispatchToProps() {
  return {
    onSubmit: (values, dispatch) => {
    	dispatch(fetchLogin(values.firstName, 
    		values.lastName,
    		values.company,
    		values.table));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);