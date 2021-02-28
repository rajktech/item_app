import React from 'react';
class Additem extends React.Component {
    render() {
        return(
            <div>
                <h4>Add Item</h4>                
                <table>
                    <tbody>
                        <tr>
                            <td>Name*</td>
                            <td><input type="text" placeholder="Enter Name" className="form-control mb-2" autoComplete="off" name="item_name" onChange={this.props.onChangeForm} value={this.props.item_name} /></td>
                        </tr>
                        <tr>
                            <td>Price*</td>
                            <td><input type="text" placeholder="Enter Price" className="form-control mb-2" autoComplete="off" name="item_price" onChange={this.props.onChangeForm} value={this.props.item_price} /></td>
                        </tr>
                        <tr>
                            <td>Quantity*</td>
                            <td><input type="text" placeholder="Enter Quantity" className="form-control mb-2" autoComplete="off" name="item_quantity" onChange={this.props.onChangeForm} value={this.props.item_quantity} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="button" className="btn btn-primary" name="submit" value="Submit" onClick={this.props.handlerAddItem} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Additem;