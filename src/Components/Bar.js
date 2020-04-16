import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { connect } from 'react-redux';

const stateToProps = (state) => {
    return {
        country: state.local
    }
}

function BarGraph(props) {
    const bar = useRef(null)
    const [size, setSize] = useState(0);
    window.addEventListener("resize", () => {
        setSize(document.documentElement.clientWidth);
    })

    var svg = null;
    var dataset = []

    props.country.data.timeline.slice(0, 7).map((ele) => {
        dataset.push(ele["recovered"]);
        dataset.push(ele["deaths"]);
        dataset.push(ele["confirmed"]);
    })
    var x = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([0, 150])
    dataset.reverse()

    useEffect(() => {
        if (!document.getElementById("s")) {
            svg = d3.select(bar.current)
                .append("svg").attr("width", "80%").attr("height", "100%").attr("id", "s").style("background","rgb(33,37,41)").attr("class","border border-secondary rounded")
        }
        else
            svg = d3.select(bar.current)
                .select("svg")


        var ele = document.getElementById("s")



        var width = ele.getBoundingClientRect().width;
        var height = 300;
        var y = height / 2;
        var gap = 50;
        var side_gap = 4;
        var bar_length = ((width - 2 * side_gap) - gap * ((dataset.length / 3) - 1)) / (dataset.length / 3)
        var bar_plus_gap = bar_length + gap;

        var prev = 0;
        svg.selectAll("rect").data(dataset).join("rect").attr(
            "width", (bar_length / 3)).attr(
                "height", function (d) {
                    return x(d);
                }).attr("x", (d, i) => {

                    if ((i % 3) === 0) {
                        prev = (i / 3) * bar_plus_gap + side_gap
                        return prev;
                    }

                    var pos = prev + ((bar_length / 3) * (i % 3))
                    return pos
                }
                ).attr("y", y).attr("fill", (d, i) => {
                    if (!(i % 3))
                        return "rgb(220,53,69)"
                    else if ((i % 3) == 1)
                        return "rgb(255,193,7)"
                    else
                        return "rgb(40,167,69)"
                }).call(enter => (enter.transition(svg.transition().duration(1000)).attr("y", (d, i) => (y - x(d)))))
    }, [size,props.country])
    return (
        <div ref={bar} className="pb-3 pl-3 pt-3">

        </div>
    )
}

const Bar = connect(stateToProps, null)(BarGraph);
export default Bar