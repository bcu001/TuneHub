import NotFound from '@/components/common/NotFound'
import HomePage from '@/pages/HomePage'
import {Route, Routes} from 'react-router'

function AppRoutes() {
  return (
   <Routes>
     <Route path='/' element={<HomePage/>} />
     <Route path='/explore' element={<HomePage/>} />
     <Route path='/search' element={<HomePage/>} />
     <Route path='/songs/:id' element={<HomePage/>} />
     <Route path='/albums/:id' element={<HomePage/>} />
     <Route path='/artists/:id' element={<HomePage/>} />
     <Route path='/playlists/:id' element={<HomePage/>} />
     <Route path='/login' element={<HomePage/>} />
     <Route path='/register' element={<HomePage/>} />
     <Route path='/*' element={<NotFound/>}/>
   </Routes>
  )
}

export default AppRoutes
