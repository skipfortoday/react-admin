import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, CardHeader, CardTitle, Spinner } from "reactstrap";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { connect } from "react-redux";


const mapStateToProps = (state) => {
    return {
        listPengumuman: state.Pengumuman.getListPengumuman,
        detailPengumuman: state.Pengumuman.getDetailPengumuman
    };
};

const RecentPengumumanTableComponent = (props) => {
    const columns = [

        {
            dataField: "Judul",
            style: (val, row) => {

            },
        },

    ];

    return (
        <div>
            {props.listPengumuman ? (
                <ToolkitProvider
                    style={{border:"none"}}
                    bootstrap4
                    keyField="UserID"
                    data={props.listPengumuman}
                    columns={columns}
                >
                    {(props) => (
                        <div>

                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h6">Pengumuman</CardTitle>
                                </CardHeader>
                                <CardBody style={{ padding: "10px" }}>

                                    <BootstrapTable
                                        {...props.baseProps}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    )}
                </ToolkitProvider>
            ) : ("")}
        </div>
    );
};

export default connect(mapStateToProps, null)(RecentPengumumanTableComponent);