import UserProfile from './UserProfile'
import CommentForm from './CommentForm'
import PostList from './PostList'
import ColorDisplay from './ColorDisplay'
import { UserContext } from './UserContext'
import { ProfileCard } from './ProfileCard'
function App() {
  const name = 'Jane';
  const email = 'jane@acme.com';
  return (
    <>
      <UserContext.Provider value={{
        name: name,
        email: email
      }}>
        <div>
          <ProfileCard />
          <UserProfile name="Jane Doe" jobTitle="Software Developer" />
          <CommentForm />
          <ColorDisplay />
          {/* <PostList /> */}
        </div>
      </UserContext.Provider>
    </>
  )
}

export default App
