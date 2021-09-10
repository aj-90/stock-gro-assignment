
import { useState } from 'react';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import {removeFav} from "./actions/index"
import {useDispatch} from "react-redux"
import {useSelector} from "react-redux";
import Pagination from './Pagination';


function App() {

  const arr=useSelector((state) => state.favReducers.list)

 
  const [term,setTerm] =useState("") 

  const [showPerPage, setShowPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

const debounce =(fn,delay) =>{
  let timeoutID ;
  return function(...args) {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID=setTimeout(() =>{
      fn(...args)
    },delay)
  }
}

const handleChange = (e) =>{
    setTerm(e.target.value)
  }

const dispatch=useDispatch()


  return (
    <div className="App">
      <div className="heading">
        <h1>StockGro Assignment</h1>
      </div>
      <div className="search">
        <input type="text" placeholder= "Search By Campaign Name" className="search_input" onChange={debounce(handleChange,2000)}/>
      </div>

      

      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
        <TableHead>
        <TableRow>
      <TableCell>ID</TableCell>
      <TableCell>Company Name</TableCell>
      <TableCell>Campaign Name</TableCell>
      <TableCell>Campaign Type</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>
      
      {
          arr && arr.length >0 ?
          arr
          .slice(pagination.start, pagination.end )
          .filter((val) => {
            if(term===""){
              return val
            }
            else if (val.name.toLowerCase().includes(term.toLowerCase())){
              return val
            }
          })
          .map(lst => 
            
            <TableRow>

            <TableCell>{lst._id}</TableCell>
            <TableCell>{lst.company}</TableCell>
            <TableCell>{lst.name}</TableCell>
            <TableCell>{lst.type}</TableCell>
            <TableCell  onClick={() =>{
                dispatch(removeFav(lst))
                alert("Data Removed Sucessfully")
                
            }}><DeleteIcon/></TableCell>
    
            </TableRow>
         
          ) : <h1> No data Available </h1>
      }
     
      </TableBody>
 
</Table>
<Pagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={arr.length}
        />
</TableContainer>
        </div>
    
  )
}

export default App;
