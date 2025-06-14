import UserProfile from './UserProfile'
import CommentForm from './CommentForm'
import PostList from './PostList'
function App() {
  return (
    <>
      <div>
        <UserProfile  name="Jane Doe" jobTitle="Software Developer" />
        <CommentForm />
        <PostList />
      </div>
    </>
  )
}

export default App
