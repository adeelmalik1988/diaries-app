import React, { FC, lazy, Suspense } from 'react';
import {
  BrowserRouter as
    Router,
  Route,
  Routes,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../rootReducer'
import ButtonAppBar from '../features/home/Appbar'
import DiaryEntriesList from '../features/diary/DiaryEntriesList';
import DiaryEntriesListNew from '../features/diary/DiaryEntriesListNew';
import { Link } from 'react-router-dom';


const Auth = lazy(() => import('../features/auth/Auth'));
const Home = lazy(() => import('../features/home/Home'));





const App: FC = () => {


  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )


  return (
    <div>

      <Router>
        <nav>
          <Link to='/' >{
            <ButtonAppBar />
          }
          </Link>
        </nav>
        <Routes>
          <Route path='/' >

            <Suspense fallback={<p>Loading...</p>} >
              {isLoggedIn ? <Home /> : <Auth />}

            </Suspense>

          </Route>
          <Route path='diary/:id' element={<DiaryEntriesListNew />} />


        </Routes>

      </Router>


    </div>
  );
}

export default App;