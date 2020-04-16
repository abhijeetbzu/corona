import React, { useEffect, useRef, useState } from 'react'
import * as d3 from "d3";
import { connect } from 'react-redux';

const stateToProps = (state) => {
    return {
        plot: state.local
    }
}

const Line = (props) => {

    const [size,setSize] = useState(0)

    var triggerChange = () => {
        setSize(document.documentElement.clientWidth)
    }

    window.addEventListener("resize", triggerChange)

    const line = useRef(null)

    var dataset1 = [];
    var dataset2 = [];
    var dataset3 = [];

    props.plot.data.timeline.map((value) => {
        dataset1.push(value["confirmed"])
        dataset2.push(value["deaths"])
        dataset3.push(value["recovered"])
    })

    dataset1.reverse()
    dataset2.reverse()
    dataset3.reverse()



    var drawLine = (w, h, dataset, stroke,path_id) => {
        var w_pad = w / dataset.length

        var svg = null;

        if (!(document.getElementById("lineplot"))) {
            svg = d3.select(line.current).append("svg").attr(
                "width", w
            ).attr(
                "height", h
            ).attr(
                "id", "lineplot"
            ).style("background","rgb(33,37,41)").attr("class","border border-secondary rounded")
        }
        else{
            svg = d3.select(line.current).select("svg")
        }





        var yAxis = d3.axisLeft().scale(props.scale)

        var lineFunc = d3.line().x(
            function (d, i) {
                return i * w_pad;
            }
        ).y(
            function (d, i) {
                return h - 2 * d;
            }
        )
        var lineFuncinitial = d3.line().x(
            function (d, i) {
                return i * w_pad;
            }
        ).y(
            function (d, i) {
                return h;
            }
        )

        lineFunc(dataset)

        var path = null
        if(!(document.getElementById(path_id))){
            console.log(path_id+"created")
            path = svg.append("path").attr("stroke", stroke).attr("fill", "none").attr("id",path_id)
        }
        else{
            path = svg.select("#"+path_id)
        }
        path.attr("d", lineFuncinitial(dataset))
        path.call(enter => (enter.transition(path.transition().duration(1000)).attr("d", lineFunc(dataset))))
    }

    var line1 = (w, h,path_id) => {
        drawLine(w, h, dataset1, "rgb(220,53,69)",path_id)
    }

    var line2 = (w, h,path_id) => {
        drawLine(w, h, dataset2, "rgb(108,117,125)",path_id)
    }

    var line3 = (w, h,path_id) => {
        drawLine(w, h, dataset3, "rgb(40,167,69)",path_id)
    }

    useEffect(
        () => {
            const w = 200;
            const h = 200;
            line1(w, h,"path_1")
            line2(w, h,"path_2")
            line3(w, h,"path_3")
        },[props.plot,size]
    )

    return (
        <div ref={line} class="pt-3">

        </div>
    )
}

const LinePlot = connect(stateToProps, null)(Line);

export default LinePlot;