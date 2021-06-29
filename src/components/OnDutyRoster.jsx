import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader, CardTitle, Spinner } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from "react-redux";


const { SearchBar } = Search;


const defaultSorted = [
   {
      dataField: "UserID",
      order: "asc",
   },
];

const mapStateToProps = (state) => {
   return {
      getAdminOnDuty: state.Admin.getAdminOnDuty,
      errorAdminOnDuty: state.Admin.errorAdminOnDuty,
      lastUserActive: state.Laporan.getLaporanHead.UserID
   };
};

const OnDutyRoster = (props) => {
   const columns = [

      {
         dataField: "Nama",
         text: "Nama",
         sort: true,
         
         headerStyle: () => {
            return { width: "110px", backgroundColor: "#f9a826" };
         },
         style: (val, row) => {
            
            if(row.UserID == props.lastUserActive )
            return {fontWeight: "bold", padding: "10px", backgroundColor:"green", color:"#fff" }
            else
            return { fontWeight: "normal", padding: "10px"};
         },
      },
      {
         dataField: "ScanMasuk",
         text: "Jam",
         sort: true,
         headerStyle: () => {
            return { width: "50px", backgroundColor: "#f9a826" };
         },
         style: (val, row) => {
            if(row.UserID == props.lastUserActive )
            return {fontWeight: "bold", padding: "10px", backgroundColor:"green", color:"#fff" }
            else
            return { fontWeight: "normal", padding: "10px"};
         },
      },
   ];

   return (
      <div>
         {props.getAdminOnDuty ? (
            <ToolkitProvider
               bootstrap4
               keyField="UserID"
               data={props.getAdminOnDuty}
               columns={columns}
               rowStyle={{ fontWeight: "bold" }}
               defaultSorted={defaultSorted}
               search
            >
               {(props) => (
                  <div>
                     
                     <Card>
                        <CardHeader>
                           <CardTitle tag="h6">On Duty Roster </CardTitle>
                        </CardHeader>
                        <CardBody style={{padding:"10px"}}>
                           <SearchBar
                              {...props.searchProps}
                              placeholder="Search .."
                           />

                           <BootstrapTable
                              {...props.baseProps}
                           />
                        </CardBody>
                     </Card>
                  </div>
               )}
            </ToolkitProvider>
         ) : (
            <div className="text-center">
               {props.errorAdminOnDuty ? (
                  <h4>{props.errorAdminOnDuty}</h4>
               ) : (
                  <Spinner color="dark" />
               )}
            </div>
         )}
      </div>
   );
};

export default connect(mapStateToProps, null)(OnDutyRoster);
