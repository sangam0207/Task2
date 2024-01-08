import React from 'react'
import Data from './page/Data'
import SearchForm from './page/SearchData'
import {Route,Routes} from 'react-router-dom'
import FilterData from './page/FilterData'
import QueryData from './page/QueryData'
function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<SearchForm/>}/>
      <Route path='/allData' element={<Data/>}/>
      <Route path='/filter' element={<FilterData/>}/>
      <Route path='/byQuery' element={<QueryData/>}/>
      </Routes> 
    </>
  )
}

export default App
