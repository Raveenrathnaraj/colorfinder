import React from "react";
import "./Modal.css";

export default function Modal({ isError, setIsError }) {
    return (
        <React.Fragment>
            {isError &&
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsError(false)}>&times;</span>
                        <p>Error Fetching HexValues, Pls retry</p>
                    </div>
                </div>
            }
        </React.Fragment>
    )

}