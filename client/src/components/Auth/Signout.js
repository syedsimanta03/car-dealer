import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { notification, Icon } from 'antd'

const handleSignout = (client, history) => {
  // clear local storage token
  localStorage.setItem('token', '')
  // Apollo client store reset->signout successfully
  client.resetStore()
  // Redirect to Home after Signout
  history.push('/')
  // Show notification
  notification.open({
    message: 'Logged Out From The App',
    description: 'See you soon!',
    icon: <Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />,
  })
}

const Signout = ({ history }) => (
  <ApolloConsumer>
    {(client) => {
      // console.log(client);
      return (
        <button
          className='signout'
          onClick={() => handleSignout(client, history)}
        >
          Signout
        </button>
      )
    }}
  </ApolloConsumer>
)

export default withRouter(Signout)
