import TodoApp from './todoApp'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';


function App() {


  return (
    <div className='h-screen w-full flex justify-center items-center bg-gray-800 '>

          <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>

    <TodoApp/>
    </div>
  )
}

export default App
