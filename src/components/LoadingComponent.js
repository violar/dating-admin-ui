import React from 'react';

export const Loading = (props) => {
    if(props.isActive === true) {
        console.log("inside loading part");
        return (
            <div className="col-12">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading . . .</p>
            </div>
        )
    }
    
    return(<div/>);
}