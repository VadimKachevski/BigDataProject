
import React, { useEffect, useState, useRef, useContext } from "react";
import css from './Table.module.css'
import { useTable, useBlockLayout } from 'react-table'


import classNames from 'classnames';

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


// import { SocketContextTable, socketTable } from 'src/context/socket';
import { SocketContextTable } from 'src/context/socket';
import { ThemeProvider } from "@material-ui/core";

const Maketable = ({ columns, data }) => {
  // var data = new Array(6)
  // for (var i = 0; i < 6; i++) {
  //   data[i] = { col: i, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  // }
  // console.log(olddata)
  // console.log(newdata)
  // if(olddata != null)
  // {
  //   for(let i=0;i<newdata.length && i< olddata.length;i++){
  //     for(let j=0;j<newdata.length && j< olddata.length;j++){
  //       data[i][j]=newdata[i][j]+olddata[i][j]
  //     }
  //   }
  // }
  // else{
  //   data=newdata
  // }
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })
  //console.log(headerGroups)

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()} className={classNames({
                [css.table2]: column.Header == 'Predictions',
                [css.table]: true
              })}>

                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()} className={css.table}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}


function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const Table = () => {
  // const [socket,setSocket] =useState(socketIOClient("http://localhost:3000/"))
  const [socket, setSocket] = useState(useContext(SocketContextTable))
  const [enable,setEnable] = useState(true)
  const [data, setData] = useState(()=>{
    var tableinfo = JSON.parse(localStorage.getItem('tableState'))
    console.log(tableinfo)
    if(tableinfo!=null || tableinfo!= undefined)
    {
      return tableinfo
    }
   return {table:[],totalValue:0,correctValue:0}}
      )
  const prevData = usePrevious(data);
  useEffect(() => {
    var tableinfo = JSON.parse(localStorage.getItem('tableState'))
    if(tableinfo==null || tableinfo== undefined)
    {
    setData(() => {
      //return [{A:5,B:5,C:5},{A:2,C:2,D:2}]
      console.log(prevData)
      console.log(data)
      var matrix = new Array(6)
      for (var i = 0; i < 6; i++) {
        matrix[i] = { col: i, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      }
      return {table:matrix,totalValue:0,correctValue:0}
    })
  }

    return () => {
      socket.off("change_data")
    }
  }, [])

 

  const startListen = () => {

    socket.emit("startListen", data);
    setEnable(false)
    socket.on("change_data", (msg) => {
      console.log("gotsomething")
      
      setData((prevData)=>{
        var total = 0
         var correct = 0
        var dataarray = new Array(6)
        for (var i = 0; i < 6; i++) {
          dataarray[i] = { col: i, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        }
        console.log(prevData)
        console.log(msg)
        if (prevData.table != null) {
          for (let i = 0; i < msg.length && i < prevData.table.length; i++) {
            for (let j = 0; j < msg.length && j < prevData.table.length; j++) {
              dataarray[i][j] = msg[i][j] + prevData.table[i][j]
              total+=dataarray[i][j]
              if(i==j){
                correct+=dataarray[i][j]
              }
            }
          }
        }
        else {
          dataarray = msg
        }
        localStorage.setItem('tableState',JSON.stringify({table:dataarray,totalValue:total,correctValue:correct}))
        return {table:dataarray,totalValue:total,correctValue:correct}
      })
      
      // for(let i=0;i<msg.length;i++){
      //   for(let j=0;j<msg.length;j++){
      //     total+=msg[i][j]
      //     if(i==j){
      //       correct+=msg[i][j]
      //     }
      //   }
      // }
      //console.log(total,correct)
      //setAcc([total,correct])

    });
  }


  const stopListen = () => {
    socket.off("change_data")
    setEnable(true)
  }

  const clearMatrix = () =>{
    setData(() => {
      //return [{A:5,B:5,C:5},{A:2,C:2,D:2}]
      console.log(prevData)
      console.log(data)
      var matrix = new Array(6)
      for (var i = 0; i < 6; i++) {
        matrix[i] = { col: i, 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      }
      localStorage.setItem('tableState',JSON.stringify({table:matrix,totalValue:0,correctValue:0}))
      return {table:matrix,totalValue:0,correctValue:0}
    })
  }


  const columns = React.useMemo(
    () => [
      {
        Header: 'Predictions',
        columns: [
          {
            Header: '*',
            accessor: 'col',
          },
          {
            Header: '0',
            accessor: '0',
          },
          {
            Header: '1',
            accessor: '1',
          },
          {
            Header: '2',
            accessor: '2',
          },
          {
            Header: '3',
            accessor: '3',
          },
          {
            Header: '4',
            accessor: '4',
          },
          {
            Header: '5',
            accessor: '5',
          },
        ],
      },
    ],
    []
  )

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={css.table} >
        <h1>Prediction confusion matrix</h1>
      </Grid>
      <Grid item xs={1} className={css.leftGrid}>
        <div className={css.leftGridText}>Exit</div>
      </Grid>
      <Grid item xs={11}>
        <Maketable columns={columns} data={data.table} />
      </Grid>
      <Grid item xs={12} container justifyContent="center" padding={2}  className={css.ButtonsAndText}>
        <Grid item xs={1}>
        <Button id="startEval"  onClick={startListen}  disabled={!enable} variant="contained" color="primary" disableElevation >
          Start Eval
        </Button>
        </Grid>
        <Grid item xs={1}>
        <Button id="stopEval" onClick={stopListen} disabled={enable} variant="contained" color="primary" disableElevation >
          Stop Eval
        </Button>
        </Grid>
        <Grid item xs={1}>
        <Button  onClick={clearMatrix} variant="contained" color="primary"  disableElevation >
         Clear matrix data
        </Button>
        </Grid>
      </Grid>
      <Grid item  xs={12} className={css.ButtonsAndText}>
      <div >{(data.correctValue / data.totalValue).toFixed(2) * 100}%</div>
      </Grid>
    </Grid>

  );

}






export default Table;