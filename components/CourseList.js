import { gql, graphql } from 'react-apollo'
import ErrorMessage from './ErrorMessage'

function CourseList ({ data: { loading, error, allCourses, _allCoursesMeta }}) {
  if (error) return <ErrorMessage message='Error loading posts.' />
  if (allCourses && allCourses.length) {
    return (
      <section>
        <ul>
          {allCourses.map((course, index) =>
            <li key={course.id}>
              <div className="course-wrapper">
                <span>{index + 1}. </span>
                <div>
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                </div>
              </div>
            </li>
          )}
        </ul>
        <style jsx>{`
          section {
            padding-bottom: 20px;
          }
          li {
            display: block;
            margin-bottom: 10px;
          }
          .course-wrapper {
            display: flex;
          }
          h2 {
            font-size: 14px;
            margin: 0 10px 0 0;
            text-decoration: none;
            padding-bottom: 0;
            border: 0;
          }
          p {
            font-size: 14px;
            margin: 0 0 1em 0;
          }
          span {
            font-size: 14px;
            margin-right: 5px;
          }
          ul {
            margin: 0;
            padding: 0;
          }
          button:before {
            align-self: center;
            border-style: solid;
            border-width: 6px 4px 0 4px;
            border-color: #ffffff transparent transparent transparent;
            content: "";
            height: 0;
            margin-right: 5px;
            width: 0;
          }
        `}</style>
      </section>
    )
  }
  return <div>Loading</div>
}

const allCourses = gql`
  query allCourses {
    allCourses(orderBy: createdAt_DESC) {
      id
      title
      description
      createdAt
    },
    _allCoursesMeta {
      count
    }
  }
`

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(allCourses, {
  props: ({ data }) => ({
    data
  })
})(CourseList)
