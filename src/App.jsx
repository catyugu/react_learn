import UserProfile from './UserProfile'
import CommentForm from './CommentForm'
import PostList from './PostList'
import ColorDisplay from './ColorDisplay'
function App() {
  return (
    <>
      <div>
        <UserProfile  name="Jane Doe" jobTitle="Software Developer" />
        <CommentForm />
        <ColorDisplay />
        {/* <PostList /> */}
      </div>
    </>
  )
}

export default App
