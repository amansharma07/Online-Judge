import React from "react";
import { render } from "react-dom";
import { makeData } from "./utils";
import "./leaderboard.css";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: makeData(2,[{handle:"harsh",score:500},{handle:"aman",score:400}])
    };
  }
  componentDidMount=()=>{
    let c;
    console.log(this.props.contestId);
    fetch(`http://localhost:3001/getRegister?c_id=${this.props.contestId}`)
    .then(res => res.json())
    .then(async (datas)=>{
      c=datas;
      let bb=await fetch(`http://localhost:3001/getScore?c_id=${this.props.contestId}`).
      then(res => res.json())
      .then(data=>{
          let map={}
          for(let i=0;i<data.length;i++){
            map[data[i].u_id]=parseInt(data[i].sum);
          }
          let req=[];
          // console.log(map);
          for(let i=0;i<c.length;i++){
            if(c[i].u_id in map)
                req.push({handle:c[i].handle,score:map[c[i].u_id]})
            else
                req.push({handle:c[i].handle,score:0})
          }
          this.setState({data:makeData(req.length,req)});
          console.log(req);
      })
      .catch(err => console.log(err));
    }).catch(err => console.log(err))
    

  }


  render() {
    const { data } = this.state;
    return (
      <div className="fo">
        <ReactTable
          data={data}
          columns={[
                {
                  Header: "Handle",
                  accessor: "handle"
                },
                {
                  Header: "Score",
                  accessor: "score"
                }
          ]}
          defaultPageSize={5}
          style={{
            height: "400px"
          }}
          className="-striped -highlight fo"
        />
        <br />
      </div>
    );
  }
}

export default Leaderboard;