import React from 'react';

export default class ListItems extends React.Component {
  handleClick(item) {
    console.log("what's the event target value:", item);
    this.props.onUserSelect(item);
  }
  render() {
    let users = this.props.users.map((item, index) => {
      //return <li key={index} onClick={this.props.onUserSelect}>{item.name}</li> // need to check if i can add a click handler here that is defined elsewhere and pass in the selected user
      return (
        <div className="item" key={index} value={item} onClick={this.handleClick.bind(this, item)}>
          <img className="ui avatar image" src={item.avatar}/>
          <div className="content">
            <div className="description">{item.name}</div>
          </div>
        </div>
      )

    });
    return (
        <div className="ui relaxed divided list">
          {users}
        </div>
    )
  }
}

// ListItems.propTypes = {
//   users: React.propTypes.array.isRequired,
//   onUserSelect: React.propTypes.function.isRequired,
// }
