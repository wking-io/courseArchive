import App from '../components/App'
import Header from '../components/Header'
import Submit from '../components/Submit'
import CourseList from '../components/CourseList'
import withData from '../lib/withData'

export default withData((props) => (
  <App>
    <Header pathname={props.url.pathname} />
    <Submit />
    <CourseList />
  </App>
))
