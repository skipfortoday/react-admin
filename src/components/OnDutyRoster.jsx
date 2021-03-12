import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {  Spinner } from "reactstrap";
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
  };
};

const OnDutyRoster = (props) => {
  const columns = [
    
    {
      dataField: "Nama",
      text: "Nama",
      sort: true,
      headerStyle: () => {
        return { width: "110px", backgroundColor: "#fec107" , lineHeight : '20%'};
      },
      style: () => {
        return { fontWeight: "bold" ,lineHeight : '20%'};
      },
    },
	{
		dataField: "ScanMasuk" ,
		text: "Jam",
		sort: true,
		headerStyle: () => {
		  return { width: "40px", backgroundColor: "#fec107" , lineHeight : '20%'};
		},
		style: () => {
		  return { fontWeight: "bold" ,lineHeight : '20%' };
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
          rowStyle={{ fontWeight: "bold"  }}
          defaultSorted={defaultSorted}
          search
        >
          {(props) => (
            <div>
              {/* <Card
                body
                inverse
                style={{ backgroundColor: "#ffffff", borderColor: "#ffffff" }}
              > */}
                {/* <Row> */}
               		{/* <Col> */}
					   <div class="card">
		<div class="card-header">
		  <h6>On Duty Roster</h6>
		</div>
		<div class="card-body">
                    {/* <div className="float-right"> */}
                      <SearchBar
                        {...props.searchProps}
                        placeholder="Search .."
                      />
                    {/* </div> */}
                  {/* </Col> */}
                {/* </Row> */}

                <BootstrapTable
                  {...props.baseProps}
                  // pagination={paginationFactory()}
                />
				</div>
		</div>
              {/* </Card> */}
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
