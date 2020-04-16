import React, { useEffect, useRef } from 'react'
import { API_URL, LOC_URL } from '../Constants/constant'
import { connect } from 'react-redux';
import { fetchLocal } from '../Action/action'
import * as d3 from 'd3'

function Country(props) {
    const dd = useRef(null);

    useEffect(() => {
        fetch(API_URL + "countries").then(response => response.json())
            .then(resp => {
                let code = resp.data.map((country) => {
                    return {
                        [country.code]: country.name
                    }
                })
                code.sort((a, b) => {
                    return a[Object.keys(a)[0]].localeCompare(b[Object.keys(b)[0]]);
                })
                code.map((country) => {
                    Object.keys(country).map((key, index) => {
                        var option = d3.select(dd.current).append("option")
                        option.attr("value", key)
                        option.append("text").text(country[key])
                    })
                })
            })
        navigator.geolocation.getCurrentPosition((position) => {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            fetch(LOC_URL + "lat=" + lat + "&lng=" + long + "&username=abhibzu").then(resp => resp.json())
                .then(
                    (resp) => {
                        document.getElementById("country").value = resp["countryCode"]
                        fetchData(resp["countryCode"])
                    }
                )
        })
        
    }, [])

    var doFetching = () => {
        var ele = document.getElementById("country").value;
        fetchData(ele)
    }
    var fetchData = (ele) =>{
        const base = "/countries/" + ele + "?include=timeline";
        props.fetchLocal(base);
    }

    return (
        <>
            <h1 style={{color:"white"}}>Select Country</h1>
            <br></br>
            <select id="country" ref={dd} className="btn dropdown-toggle" style={{background:"rgb(33,37,41)",color:"white"}} onChange={doFetching}>

            </select>
        </>
    )
}

const Countries = connect(null, { fetchLocal })(Country);
export default Countries;