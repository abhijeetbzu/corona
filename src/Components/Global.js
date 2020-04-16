import React, { useEffect } from 'react'
import { fetchGlobal } from "../Action/action";
import { connect } from 'react-redux'

function dispatchStateToProps(state) {
    return { globe: state.global }
}

var GlobeUI = (props) => {
    document.body.style.background = "rgb(52,58,64)"
    useEffect(() => {
        props.fetchGlobal("timeline")
    }, [])

    return props.globe && (
        <div className="card-deck bg-dark pt-3 pl-3 pr-3">
            <div className="card text-white bg-danger mb-3" style={{maxWidth: "18rem"}}>
                <div className="card-header">Confirmed</div>
                <div className="card-body">
                    <h4 className="card-title">{props.globe.data[0]["confirmed"]}</h4>
                </div>
            </div>
            <div className="card text-white bg-success mb-3" style={{maxWidth: "18rem"}}>
                <div className="card-header">Recovered</div>
                <div className="card-body">
                    <h4 className="card-title">{props.globe.data[0]["recovered"]}</h4>
                </div>
            </div>
            <div className="card text-white bg-secondary mb-3" style={{maxWidth: "18rem"}}>
                <div className="card-header">Deaths</div>
                <div className="card-body">
                    <h4 className="card-title">{props.globe.data[0]["deaths"]}</h4>
                </div>
            </div>
            <div className="card text-white bg-info mb-3" style={{maxWidth: "18rem"}}>
                <div className="card-header">Active</div>
                <div className="card-body">
                    <h4 className="card-title">{props.globe.data[0]["active"]}</h4>
                </div>
            </div>
            <div className="card text-white bg-warning mb-3" style={{maxWidth: "18rem"}}>
                <div className="card-header">New Confirmed</div>
                <div className="card-body">
                    <h4 className="card-title">{props.globe.data[0]["new_confirmed"]}</h4>
                </div>
            </div>
        </div>
    )
}

const globe = connect(dispatchStateToProps, { fetchGlobal })(GlobeUI)

export default globe;