import React from 'react'
import { connect } from 'react-redux'
import Like from '../Icons/Like.png'
import Dislike from '../Icons/Dislike.png'
import CountryBar from '../Components/CountryBar'

const stateProps = (state) => {
    return {
        rate: state.local
    }
}

const Rate = (props) => {
    let rec_rate = null;
    let death_rate = null;
    if (props.rate) {
        rec_rate = props.rate.data.latest_data.calculated["recovery_rate"] > 20;
        death_rate = props.rate.data.latest_data.calculated["death_rate"] < 5;
    }
    return (
        <div style={{ width: "40%", marginLeft: "30%" , height:"100%"}}>
            <br></br>
            <CountryBar></CountryBar>
            <br></br>
            <div className="card-deck pt-3 pl-3 pr-3 pb-3">
                <div className={(rec_rate ? "bg-success" : "bg-danger") + " card align-items-center pt-1"}>
                    <img src={rec_rate ? Like : Dislike} className="card-img-top" alt="..." style={{ width: "100px", height: "100px" }}></img>
                    <div className="card-body">
                        <h5 className="card-title" >Recovery Rate</h5>
                    </div>
                </div>
                <div className={(death_rate ? "bg-success" : "bg-danger") + " card align-items-center pt-1"}>
                    <img src={death_rate ? Like : Dislike} className="card-img-top" alt="..." style={{ width: "100px", height: "100px" }}></img>
                    <div className="card-body">
                        <h5 className="card-title">Death Rate</h5>
                    </div>
                </div>
            </div>
            <br></br>
            
            <h1 className="border rounded border-secondary" style={{background:"rgb(33,37,41)",color:"white"}}>TODAY</h1>
            <div className="card-deck pt-3 pl-3 pr-3 pb-3">
                <div className="card border-danger mb-3">
                    <div className="card-header text-danger">Confirmed</div>
                    <div className="card-body text-danger">
                        <h5 className="card-title">{props.rate?props.rate.data.today["confirmed"]:null}</h5>
                    </div>
                </div>
                <div className="card border-secondary mb-3">
                    <div className="card-header text-secondary">Deaths</div>
                    <div className="card-body text-secondary">
                        <h5 className="card-title">{props.rate?props.rate.data.today["deaths"]:null}</h5>
                    </div>
                </div>
            </div>
            <br></br>
            <h1 className="border rounded border-secondary" style={{background:"rgb(33,37,41)",color:"white"}}>STATS</h1>
        </div >
    )
}

const Info = connect(stateProps, null)(Rate);
export default Info;