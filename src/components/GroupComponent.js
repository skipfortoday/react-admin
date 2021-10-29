import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Row, Col, Spinner, Card } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../components/GroupStyle.css';
import {
   faEdit,
   faTrash,
   faUsersCog,
   faPlus,
   faEye,
} from "@fortawesome/free-solid-svg-icons";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import { deleteGroup, getGroupList } from "../actions/groupAction";

const { SearchBar } = Search;

const handleClick = (dispatch, GroupID, props) => {
   swal({
      title: "Apakah Anda yakin akan menghapus data ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
   }).then((willDelete) => {
      if (willDelete) {
         dispatch(deleteGroup(GroupID));
         swal("Data Group Sukses dihapus", {
            icon: "success",
         }).then(()=>{
            // window.location.reload()
            props.dispatch(getGroupList());
         });
      } else {
         swal("Data gagal dihapus");
      }
   });
};

const defaultSorted = [
   {
      dataField: "GroupID",
      order: "asc",
   },
];

const mapStateToProps = (state) => {
   return {
      getGroupList: state.Group.getGroupList.groups,
      errorGroupList: state.Group.errorGroupList,
   };
};

const GroupComponent = (props) => {
   const rupiahFormat=(x) => {
      if (x == undefined) return 0;
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
   }

   const jam = (x) => {
      if(x == null) return ""
      let s = x.split(":") 
      return s[0]+":"+s[1]
   }

   const columns = [
      {
         dataField: "GroupJabatan",
         text: "Group",
         sort:true,
         headerStyle: () => {
            return { width: "80px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      
      {
         dataField: "RpPotonganTerlambat",
         text: "Pot. Tlmbt",
         formatter: (val, row) => {
            return rupiahFormat(val)
         },
         headerStyle: () => {
            return { width: "30px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal", textAlign:"right" };
         },
      },
      {
         dataField: "RpPotonganTidakMasuk",
         text: "Pot.Tdk Masuk",
         formatter: (val, row) => {
            return rupiahFormat(val)
         },
         headerStyle: () => {
            return { width: "30px", backgroundColor: "#f9a826", fontWeight:500, };
         },
         style: () => {
            return { fontWeight: "normal", textAlign:"right" };
         },
      },
      {
         dataField: "Shift",
         text: "Shift",
         formatter: (val, row) => {
            return (
               <div className="coldv">
                  <div>Pagi</div>
                  {row.JamDatangSiang && row.JamDatangSiang != '00:00:00' ? <div>Siang</div> : ''}
                  {row.JamDatangSore && row.JamDatangSore != '00:00:00' ? <div>Sore</div> : ''}
               </div>
            )
         },
         headerStyle: () => {
            return { width: "30px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "",
         text: "Datang",
         formatter: (val, row) => {
            return (
               <div className="coldv">
                  <div>{jam(row.JamDatang)}</div>
                  {row.JamDatangSiang && row.JamDatangSiang != '00:00:00' ? <div>{jam(row.JamDatangSiang)}</div> : ''}
                  {row.JamDatangSore && row.JamDatangSore != '00:00:00' ? <div>{jam(row.JamDatangSore)}</div> : ''}
               </div>
            )
         },
         headerStyle: () => {
            return { width: "30px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal"};
         },
      },
      {
         dataField: "MaxJamDatang",
         text: "Max Datang",
         formatter: (val, row) => {
            return (
               <div className="coldv">
                  <div>{jam(row.MaxJamDatang)}</div>
                  {row.MaxJamDatangSiang && row.MaxJamDatangSiang != '00:00:00' ? <div>{jam(row.MaxJamDatangSiang)}</div> : ''}
                  {row.MaxJamDatangSore && row.MaxJamDatangSore != '00:00:00' ? <div>{jam(row.MaxJamDatangSore)}</div> : ''}
               </div>
            )
         },
         headerStyle: () => {
            return { width: "30px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "JamPulang",
         text: "Pulang",
         formatter: (val, row) => {
            return (
               <div className="coldv">
                  <div>{jam(row.JamPulang)}</div>
                  {row.JamPulangSiang && row.JamPulangSiang != '00:00:00' ? <div>{jam(row.JamPulangSiang)}</div> : ''}
                  {row.JamPulangSore && row.JamPulangSore != '00:00:00' ? <div>{jam(row.JamPulangSore)}</div> : ''}
               </div>
            )
         },
         headerStyle: () => {
            return { width: "30px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "MinJamLembur",
         text: "Min Lembur",
         formatter: (val, row) => {
            return (
               <div className="coldv">
                  <div>{jam(row.MinJamLembur)}</div>
                  {row.MinJamLemburSiang && row.MinJamLemburSiang != '00:00:00' ? <div>{jam(row.MinJamLemburSiang)}</div> : ''}
                  {row.MinJamLemburSore && row.MinJamLemburSore != '00:00:00' ? <div>{jam(row.MinJamLemburSore)}</div> : ''}
               </div>
            )
         },
         headerStyle: () => {
            return { width: "30px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "JamMulaiLembur",
         text: "Mulai Lembur",
         formatter: (val, row) => {
            return (
               <div className="coldv">
                  <div>{jam(row.JamMulaiLembur)}</div>
                  {row.JamMulaiLemburSiang && row.JamMulaiLemburSiang != '00:00:00' ? <div>{jam(row.JamMulaiLemburSiang)}</div> : ''}
                  {row.JamMulaiLemburSore && row.JamMulaiLemburSore != '00:00:00' ? <div>{jam(row.JamMulaiLemburSore)}</div> : ''}
               </div>
            )
         },
         headerStyle: () => {
            return { width: "30px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal" };
         },
      },
      {
         dataField: "",
         text: "Tl.Btgkt 1Jam",
         formatter: (val, row) => {
            if(!row.bertingkat) return ""
            return (
               <div className="coldv">
                  <div>{jam(row.bertingkat[1][0].MaxJamDatang) +"="+rupiahFormat(row.bertingkat[1][0].RpPotonganTerlambat)}</div>
                  {row.bertingkat[2].length>1? <div>{jam(row.bertingkat[2][0].MaxJamDatang) +"="+rupiahFormat(row.bertingkat[2][0].RpPotonganTerlambat)}</div> : ""}
                  {row.bertingkat[3].length>1? <div>{jam(row.bertingkat[3][0].MaxJamDatang) +"="+rupiahFormat(row.bertingkat[3][0].RpPotonganTerlambat)}</div> : ""}
               </div>
            )
         },
         headerStyle: () => {
            return { width: "40px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal" , textAlign:"right"};
         },
      },
      {
         dataField: "",
         text: "Tl.Btgkt 2Jam",
         formatter: (val, row) => {
            if(!row.bertingkat) return ""
            return (
               <div className="coldv">
                  <div>{jam(row.bertingkat[1][1].MaxJamDatang) +"="+rupiahFormat(row.bertingkat[1][1].RpPotonganTerlambat)}</div>
                  {row.bertingkat[2].length>1? <div>{jam(row.bertingkat[2][1].MaxJamDatang) +"="+rupiahFormat(row.bertingkat[2][1].RpPotonganTerlambat)}</div> : ""}
                  {row.bertingkat[3].length>1? <div>{jam(row.bertingkat[3][2].MaxJamDatang) +"="+rupiahFormat(row.bertingkat[3][1].RpPotonganTerlambat)}</div> : ""}
               </div>
            )
         },
         headerStyle: () => {
            return { width: "40px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal" , textAlign:"right"};
         },
      },
      {
         dataField: "",
         text: "Tl.Btgkt 3Jam",
         formatter: (val, row) => {
            if(!row.bertingkat) return ""
            return (
               <div className="coldv">
                  <div>{jam(row.bertingkat[1][2].MaxJamDatang) +"="+rupiahFormat(row.bertingkat[1][2].RpPotonganTerlambat)}</div>
                  {row.bertingkat[2].length>1? <div>{jam(row.bertingkat[2][2].MaxJamDatang) +"="+rupiahFormat(row.bertingkat[2][2].RpPotonganTerlambat)}</div> : ""}
                  {row.bertingkat[3].length>1? <div>{jam(row.bertingkat[3][2].MaxJamDatang) +"="+rupiahFormat(row.bertingkat[3][2].RpPotonganTerlambat)}</div> : ""}
               </div>
            )
         },
         headerStyle: () => {
            return { width: "40px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         style: () => {
            return { fontWeight: "normal" , textAlign:"right"};
         },
      },
      {
         dataField: "link",
         text: "Action",
         headerStyle: () => {
            return { width: "35px", backgroundColor: "#f9a826", fontWeight:500 };
         },
         formatter: (rowContent, row) => {
            return (
               <div>

                  <Link to={"group/edit/" + row.GroupID}>
                     <Button color="warning" size="sm" className="mr-2">
                        <FontAwesomeIcon icon={faEdit} />
                     </Button>
                  </Link>
                  {/* <Link to={"group/view/" + row.GroupID}>
                     <Button color="info" size="sm" className="mr-2">
                        <FontAwesomeIcon icon={faEye} />
                     </Button>
                  </Link> */}

                  <Button
                     size="sm"
                     color="danger"
                     className="mr-2"
                     onClick={() => handleClick(props.dispatch, row.GroupID, props)}
                  >
                     <FontAwesomeIcon icon={faTrash} />
                  </Button>

                  {/* <Link to={"group/terlambatbertingkat/" + row.GroupID}>
              <Button  color="warning" className="mr-2">
                <FontAwesomeIcon icon={faSortAmountUp} /> 
              </Button>
            </Link> */}
               </div>
            );
         },
      },
   ];

   return (
      <div>
         {props.getGroupList ? (
            <ToolkitProvider
               bootstrap4
               keyField="GroupID"
               data={props.getGroupList}
               columns={columns}
               rowStyle={{ fontWeight: "bold" }}
               defaultSorted={defaultSorted}
               search
            >
               {(props) => (
                  <div>
                     <Card body inverse style={{ backgroundColor: '#ffffff', borderColor: '#ffffff' }}>
                        <Row>
                           <Col>
                              <Link to="group/create">
                                 <Button color="warning" className="mr-2">
                                    <FontAwesomeIcon icon={faUsersCog} /> Tambah Group{" "}
                                    <FontAwesomeIcon icon={faPlus} />
                                 </Button>
                              </Link>
                              <Link to="group/terlambatbertingkat/">
                                 <Button color="warning" className="mr-2">
                                    <FontAwesomeIcon icon={faUsersCog} /> Terlambat Bertingkat
                                 </Button>
                              </Link>
                           </Col>
                           <Col>
                              <div className="float-right">
                                 <SearchBar {...props.searchProps} placeholder="Search .." />
                              </div>
                           </Col>
                        </Row>

                        <BootstrapTable
                           {...props.baseProps}
                           striped
                           pagination={paginationFactory({sizePerPage:10})}
                        />
                     </Card>
                  </div>
               )}
            </ToolkitProvider>
         ) : (
            <div className="text-center">
               {props.errorGroupList ? (
                  <h4>{props.errorGroupList}</h4>
               ) : (
                  <Spinner color="dark" />
               )}

            </div>
         )}
      </div>
   );
};

export default connect(mapStateToProps, null)(GroupComponent);
