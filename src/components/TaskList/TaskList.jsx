const React = require('react')
const GitHub = require('../../models/github')
const TaskListItem = require('../TaskListItem')

class TaskList extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = { notifications: [] }
  }

  componentDidMount() {
    const github = new GitHub()
    github.getNotifications().
           then(this.onNotificationsLoaded.bind(this)).
           catch(this.onNotificationsError.bind(this))
  }

  onNotificationsLoaded(notifications) {
    this.setState({ notifications })
  }

  onNotificationsError(response) {
    console.error('failed to load notifications', response)
  }

  render() {
    return (
      <div>
        <nav className="controls-container">
          <button type="button" className="control">snooze</button>
          <button type="button" className="control">ignore</button>
          <button type="button" className="control">archive</button>
        </nav>
        <ol className="issues-list">
          {this.state.notifications.map(notification =>
            <TaskListItem {...notification} key={notification.id} />
          )}
        </ol>
      </div>
    )
  }
}

module.exports = TaskList