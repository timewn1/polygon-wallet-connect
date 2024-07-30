import React from "react";

const Td = ({children, _className} : any) => {
    return (
        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-800 ${_className ? _className : ''}`}>{children}</td>
    )
}

export default Td;