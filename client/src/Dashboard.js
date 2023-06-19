import axios from "axios";
import React, { useEffect, useState } from "react";


export default function Dashboard() {

  // const [deliveryReport,setdeliveryReport]=useState([]);
  // const url = "http://localhost:5000/delivery-report";
  // useEffect(()=>{
  //   fetch(url)
  //   .then((res)=>res.json())
  //   .then((json) =>
  //   {
  //     console.log("json",json)
  //     setdeliveryReport(json)
  //   }).catch((e)=>{
  //     console.log("e",e)
  //   })
  // },[])
   const [reports, setReports] = useState([]);

   useEffect(() => {
     axios
       .get("http://localhost:5000/delivery-report")
       .then((res) => {
         const deliveryReports = res.data;
         setReports(deliveryReports);
       })
       .catch((error) => {
         console.error("Error fetching delivery reports:", error);
       });
   }, []);

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Dashboard</h3>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body table-responsive p-0">
                  <table className="table table-head-fixed text-nowrap">
                    <thead>
                      <tr>
                        <th>Message ID</th>
                        <th>Send At</th>
                        <th>Done At</th>
                        <th>TO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((delreport) => (
                        <tr key={delreport.messageId}>
                          <td>{delreport.messageId}</td>
                          <td>{delreport.sentAt}</td>
                          <td>{delreport.doneAt}</td>
                          <td>{delreport.to}</td>
                        </tr>
                      ))}


                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
