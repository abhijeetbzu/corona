import React from 'react'
import Bar from './Components/Bar'
import Line from './Components/Line'
import Info from './Components/Info'
import Countries from './Components/Countries'
import Global from './Components/Global'
import { connect } from 'react-redux'

const stateToProps = (state) => {
    return {
        country: state.local
    }
}

const Main = (props) => (
    <div>
        <div className="row row-cols-1 align-items-center bg-dark" style={{width: "100%", height: "100%" }}>
            <div className="col">
                <Global></Global>
            </div>
            <div className="col pt-3">
                <Countries></Countries>
            </div>
            {
                (props.country && props.country.data.timeline.length>0)?
                (
                    <>
                        <div className="col pt-3">
                            <Info></Info>
                        </div>
                        <div className="col">
                            <Line></Line>
                        </div>
                        <div className="col">
                            <Bar dataset={[23,78,23,56,90]}></Bar>
                        </div>
                    </>
                )
                :
                (
                    <div class="border rounded" style={{background:"rgb(33,37,41)",color:"white",marginTop:"100px"}}>
                        <h1>NO DATA FOUND</h1>
                    </div>
                )
            }
        </div>
    </div>
)

const Home = connect(stateToProps, null)(Main);
export default Home;