import React from "react";

const Th = ({children, _className}: any) => {
    return (
        <th scope="col" className={`px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase ${_className ? _className: ''}`}>{children}</th>
    )
}

export default Th;