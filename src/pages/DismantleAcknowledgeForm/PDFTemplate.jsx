import React,{ useContext } from 'react';
import {useSelector} from 'react-redux';


export class PDFTemplate extends React.PureComponent {
    render() {
        return (
            <div className='print-source'>
                <table>
                    <thead>
                        <tr>
                            <th>column 1</th>
                            <th>column 2</th>
                            <th>column 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>data 1</td>
                            <td>data 2</td>
                            <td>data 3</td>
                        </tr>
                        <tr>
                            <td>data 1</td>
                            <td>data 2</td>
                            <td>data 3</td>
                        </tr>
                        <tr>
                            <td>data 1</td>
                            <td>data 2</td>
                            <td>data 3</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}