import React from 'react';

export default class ListItems extends React.Component {
  render() {
    let users = this.props.users.map((item, index) => {
      return <li key={index} onClick={this.props.onUserSelect}>{item.name}</li> // need to check if i can add a click handler here that is defined elsewhere and pass in the selected user
    });
    return (
        <ul>
          {users}
        </ul>
    )
  }
}

// ListItems.propTypes = {
//   users: React.propTypes.array.isRequired,
//   onUserSelect: React.propTypes.function.isRequired,
// }
