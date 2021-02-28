import React from 'react';
import Modal from 'react-awesome-modal';
import {CSVLink, CSVDownload} from 'react-csv';

class Itemlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentpage: 1,
            visible: false,
            item_details: []
        }

        

        

        
    }
    

    handlerClick(id, event) {
        this.setState({currentpage: id});
    }

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    viewDetails(id) {
        var item_list = localStorage.getItem('item_list');
        item_list = JSON.parse(item_list);
        var filterresult = item_list.filter((value) => value.item_id === id);
        this.setState({item_details: filterresult});
        this.setState({
            visible : true
        });
    }

    handlerSearch = (event) => {
        let tr_node = document.querySelectorAll('#itemlist tbody tr');
        let this_txt = event.target.value.toLowerCase();
        let total_row = tr_node.length;        
        for (let i = 0; i < total_row; i++) {
            let nodetext = tr_node[i].innerText.toLowerCase();
            if (nodetext.includes(this_txt)) {
                tr_node[i].style.display = '';
            } else {
                tr_node[i].style.display = 'none';
            }
        }        
    }

    sorttable(sortColumn, type){
        var table_id = 'itemlist';
        var tableData = document.getElementById(table_id).getElementsByTagName('tbody').item(0);
        var rowData = tableData.getElementsByTagName('tr');            
        for(var i = 0; i < rowData.length - 1; i++){
            for(var j = 0; j < rowData.length - (i + 1); j++){
                if (type == 'desc') {
                    if(Number(rowData.item(j).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) < Number(rowData.item(j+1).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, ""))){
                        tableData.insertBefore(rowData.item(j+1),rowData.item(j));
                    }
                } else {
                    if(Number(rowData.item(j).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, "")) > Number(rowData.item(j+1).getElementsByTagName('td').item(sortColumn).innerHTML.replace(/[^0-9\.]+/g, ""))){
                        tableData.insertBefore(rowData.item(j+1),rowData.item(j));
                    }
                }
            }
        }
        return false;
    }

    render() {
        var perpage = 5;
        var item_list = localStorage.getItem('item_list');
        var item_array = [];
        if (item_list) {
            item_list = JSON.parse(item_list);
            var new_item_list = item_list.slice((this.state.currentpage - 1) * perpage, (this.state.currentpage - 1) * perpage + perpage);
            
            var totalpages = Math.ceil(item_list.length / perpage);

            var pagination_arr = [];
            if (totalpages > 1) {
                for (let i=1; i<=totalpages; i++) {
                    pagination_arr.push(<li key={i} className="page-item" onClick={this.handlerClick.bind(this, i)}><a className="page-link" href="#">{i}</a></li>);
                }
            }

            this.csvData = [];
            for (var item of new_item_list) {
                item_array.push(
                    <tr key={item.item_id}>
                        <td>{item.item_id}</td>
                        <td>{item.item_name}</td>
                        <td>{item.item_price}</td>
                        <td>{item.item_quantity}</td>
                        <td>
                            <input type="button" className="btn btn-secondary mr-2" onClick={this.viewDetails.bind(this, item.item_id)} value="View" />
                            <input type="button" className="btn btn-secondary" onClick={this.props.deleteItem.bind(this, item.item_id)} value="Delete" />
                        </td>
                    </tr>
                );
                var csvdata_temp = [];
                csvdata_temp = [item.item_id, item.item_name, item.item_price, item.item_quantity];
                this.csvData.push(csvdata_temp);
            }            
        }
        return(
            <div>
                {item_array.length > 0 ? 
                    <>
                    <CSVLink data={this.csvData} ><input type="button" className="btn btn-primary float-right mb-2" value="Download CSV" /></CSVLink>
                    <input type="text" className="form-control mb-2" placeholder="Search" onChange={this.handlerSearch.bind(this)} /> 
                    <table className="table table-hover table-striped" id="itemlist">
                        <thead className="thead-dark">
                            <tr>
                                <th style={{width: '50px'}}>ID</th>
                                <th>Name <a href="javascript:;" onClick={this.sorttable.bind(this, 1, 'asc')}>Sort</a></th>
                                <th>Price <a href="javascript:;" onClick={this.sorttable.bind(this, 2, 'asc')}>Sort</a></th>
                                <th>Quantity</th>
                                <th style={{width: '200px'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item_array}
                        </tbody>
                    </table>
                    <Viewinfo item_details={this.state.item_details}  visible={this.state.visible} closeModal={this.closeModal.bind(this)}/>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            {pagination_arr}
                        </ul>
                    </nav>
                    </> : 
                    <div className="alert alert-danger">
                        No Records Found
                    </div> 
                }          
            </div>
        );
    }
}

class Viewinfo extends React.Component {
    render() {
        var detail_arr = [];
        for (var i in this.props.item_details[0]) {
            let value = this.props.item_details[0][i];
            i = i.replaceAll('_', ' ');
            detail_arr.push(<div key={i}><b>{i}:</b> {value}</div>);
        }        
        return(
            <>
                <Modal 
                    visible={this.props.visible}
                    width="600"
                    effect="fadeInLeft"
                    scrollable="true"
                >
                    <div className="p-3">
                        <h4>Details</h4>
                        {detail_arr}
                        <button className="btn btn-primary" onClick={this.props.closeModal}>Cancel</button>
                    </div>
                </Modal>
            </>
        );
    }
}

export default Itemlist;