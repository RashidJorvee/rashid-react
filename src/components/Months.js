import React from "react";


function Months(props) {

    return(
        <div>
            <MonthsKeyValue monthsName={props.monthsName}/>
        </div>
    )
}


function MonthsKeyValue(props) {
    console.log(props);
    return(
        <div>            
            <ul className="list-no-style">
                {props.monthsName.map((month) => (<li key={month.id}>{month.id}. {month.title}</li>))}
            </ul>
        </div>
    )

}
export default Months;