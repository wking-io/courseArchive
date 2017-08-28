import { gql, graphql } from 'react-apollo'

function Submit ({ createCourse }) {
  function handleSubmit (e) {
    e.preventDefault()

    let title = e.target.elements.title.value
    let description = e.target.elements.description.value

    if (title === '' || description === '') {
      window.alert('Both fields are required.')
      return false
    }

    createCourse(title, description)

    // reset form
    e.target.elements.title.value = ''
    e.target.elements.description.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder='title' name='title' />
      <textarea placeholder='description' name='description'></textarea>
      <button type='submit'>Submit</button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          width: 200px
          display: block;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          padding: 2px;
        }
        textarea {
          display: block;
          width: 200px;
          height: 100px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          padding: 2px;
        }
      `}</style>
    </form>
  )
}

const createCourse = gql`
  mutation createCourse($title: String!, $description: String!) {
    createCourse(title: $title, description: $description) {
      id
      title
      description
      createdAt
    }
  }
`

export default graphql(createCourse, {
  props: ({ mutate }) => ({
    createCourse: (title, description) => mutate({
      variables: { title, description },
      updateQueries: {
        allCourses: (previousResult, { mutationResult }) => {
          const newCourse = mutationResult.data.createCourse
          return Object.assign({}, previousResult, {
            // Append the new post
            allCourses: [newCourse, ...previousResult.allCourses]
          })
        }
      }
    })
  })
})(Submit)
