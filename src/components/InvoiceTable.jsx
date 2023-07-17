import './InvoiceTable.css';
import { useState } from 'react';
import formatCurrency from '../utils/formatCurrency.js';
// import idGenerator from '../utils/idGenerator.js';

let getId = 5

const EditableRowModeButtons = ({isEditing, onEditClick, onSaveClick, onDeleteRow}) => {
    return isEditing ? (
        <td>
            <button onClick={onSaveClick}>Save</button>
        </td>
    ) : (
        <td>
            <button onClick={onDeleteRow}>Delete</button>
            <button onClick={onEditClick}>Edit</button>
        </td>
    )
}

const EditableDescriptionCell = ({value, isEditing, onValueChange}) => {
    return isEditing ? (
        <td>
            <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
        </td>
    ) : (
        <td>{value}</td>
    )
}

const EditableRateCell = ({value, isEditing, onValueChange}) => {
    return isEditing ? (
        <td>
            $<input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
            /hr
        </td>
    ) : (
        <td>{formatCurrency(value)}</td>
    )
}

const EditdableHoursCell = ({value, isEditing, onValueChange}) => {
    return isEditing ? (
        <td>
            <input type="text" value={value} onChange={(e) => onValueChange(e.target.value)} />
        </td>
    ) : (
        <td>{value}</td>
    )
}

const InvoiceTableHeader = () => {
    return (
        <tr>
            <th></th>
            <th>Description</th>
            <th>Rate</th>
            <th>Hours</th>
            <th>Amount</th>
        </tr>
    )
}

const InvoiceTableAddButton = ({onClick}) => {
    return (
        <tr>
            <td></td>
            <td colSpan="4">
                <button onClick={onClick}>Add</button>
            </td>
        </tr>
    )
}

const InvoiceTableRow = ({initialInvoiceData, initialIsEditing, onDeleteRow}) => {

    const [isEditing, setIsEditing] = useState(initialIsEditing)

    const [description, setDescription] = useState(initialInvoiceData.description)
    const [rate, setRate] = useState(initialInvoiceData.rate)
    const [hours, setHours] = useState(initialInvoiceData.hours)

    const setEditMode = () => setIsEditing(true)
    const setNormalMode = () => setIsEditing(false)

    // const {description, rate, hours} = initialInvoiceData

    return (
        <tr>
            <EditableRowModeButtons isEditing={isEditing} onEditClick={setEditMode} onSaveClick={setNormalMode} onDeleteRow={onDeleteRow}/>
            <EditableDescriptionCell value={description} isEditing={isEditing} onValueChange={setDescription}/>
            <EditableRateCell value={rate} isEditing={isEditing} onValueChange={setRate} />
            <EditdableHoursCell value={hours} isEditing={isEditing} onValueChange={setHours} />
            <td>{formatCurrency(rate * hours)}</td>
        </tr>
    )
}

const InvoiceTable = ({initialInvoiceList}) => {

    const [invoiceList, setInvoiceList] = useState(initialInvoiceList)

    const addInvoiceRow = () => {
        const newInvoiceList = [...invoiceList]

        const newInvoiceRow = {
            id: getId,
            description: 'Description',
            rate: '',
            hours: '',
            isEditing: true
        }

        newInvoiceList.push(newInvoiceRow)

        setInvoiceList(newInvoiceList)

        getId += 1
    }

    const deleteInvoiceRow = (id) => {
        const newInvoiceList = [...invoiceList]

        const index = newInvoiceList.findIndex(el => el.id === id)

        newInvoiceList.splice(index,1)
        setInvoiceList(newInvoiceList)
    }

    const rows = invoiceList.map(({id, description, rate, hours, isEditing}) => {
        // const {id, description, rate, hours} = el

        return <InvoiceTableRow
                key={id}
                initialInvoiceData={{description, rate, hours}}
                initialIsEditing={isEditing}
                onDeleteRow={() => deleteInvoiceRow(id)}
        />
    })

    return (
        <table>
            <thead>
                <InvoiceTableHeader />
            </thead>
            <tbody>
                {rows}
                {/* <InvoiceTableRow initialInvoiceData={{description: 'Web Development', rate: 25, hours: 10}} isEditing={false} />
                <InvoiceTableRow initialInvoiceData={{description: 'Copyrighting', rate: 20, hours: 8}} isEditing={true}/> */}
                {/* <tr>
                    <EditableRowModeButtons isEditing={false} />
                    <EditableDescriptionCell value='Web Development' isEditing={false}/>
                    <EditableRateCell value={25} isEditing={false} />
                    <EditdableHoursCell value={10} isEditing={false} />
                </tr>

                <tr>
                    <EditableRowModeButtons isEditing={true} />
                    <EditableDescriptionCell value='Copywriting' isEditing={true}/>
                    <EditableRateCell value={25} isEditing={true} />
                    <EditdableHoursCell value={10} isEditing={true} />
                </tr> */}
            </tbody>
            <tfoot>
                <InvoiceTableAddButton onClick={addInvoiceRow} />
            </tfoot>
        </table>
    )
}

export default InvoiceTable