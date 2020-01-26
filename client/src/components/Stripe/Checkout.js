import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { notification, Icon } from 'antd';


export default class Checkout extends React.Component {

 openNotification = () => {
 
  notification.open({
    message: 'Purchased Successful! ',
    description:
      'Our manager is about to contact you soon. Please check your email.',
    icon: <Icon type='smile' style={{ color: '#108ee9' }} />
  });
};
  onToken = () => {
      this.openNotification()
  };

  render() {
    return (
      <StripeCheckout
        amount={this.props.amount}
        billingAddress
        shippingAddress
        description={this.props.description}
        image={this.props.image}
        locale={this.props.locale}
        name={this.props.name}
        stripeKey='pk_test_liw67asXuBoFpWwNNk4fjATn00h8zspQwy'
        token={this.onToken}
        label={this.props.label}
        zipCode
      />
    );
  }
}
