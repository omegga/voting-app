import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

function getVotePercentage(votes, count) {
	return votes.length ? (count / votes.length * 100).toFixed(2) : 0; // prevent division by zero
}

function getPercentages(answers, votes) {
	const answersGraph = answers.reduce((graph, answer) => {
		graph[answer.id] = votes.reduce((count, vote) => {
			if (answer.id === vote.answerId) {
				return count + 1;
			}
			return count;
		}, 0);
		return graph;
	}, {});
	for (const answerId in answersGraph) {
		const count = answersGraph[answerId];
		answersGraph[answerId] = getVotePercentage(votes, count);
	}
	return answersGraph;
}

const PollResult = ({ answers = [], votes = [] }) => {
	const answersPercentage = getPercentages(answers, votes);
	useEffect(function drawChart() {
		d3.select("#chart").selectAll("svg").remove();
		const PIE_SIZE = 400;
		const WIDTH = PIE_SIZE;
		const HEIGHT = PIE_SIZE;
		const MARGIN = 40;
		const RADIUS = Math.min(WIDTH, HEIGHT) / 2 - MARGIN;
		const LEGEND_CIRCLE_SIZE = 10;
		const LEGEND_MARGIN_LEFT = 10;
		const LEGEND_MARGIN_BETWEEN_ITEMS = (LEGEND_CIRCLE_SIZE * 3);
		const svg = d3.select("#chart")
			.append("svg")
			.attr("width", WIDTH)
			.attr("height", HEIGHT)
			.append("g")
			.attr("transform", `translate(${WIDTH/2}, ${HEIGHT/2})`);
		const color = d3.scaleOrdinal()
			.domain(Object.keys(answersPercentage))
			.range(d3.schemeSet1);
		const pie = d3.pie()
			.value(d => d.value);
			
		const dataReady = pie(d3.entries(answersPercentage));

		svg
			.selectAll("whatever")
			.data(dataReady)
			.enter()
			.append("path")
			.attr("d", d3.arc().innerRadius(WIDTH / 4).outerRadius(RADIUS))
			.attr("fill", d => color(d.data.key))
			.attr("stroke", "black")
			.attr("stroke-width", "2px")
			.style("opacity", 0.75);
			
		const computedLegendHeight = answers.length * LEGEND_CIRCLE_SIZE * 4;
		const legendHeight = computedLegendHeight < HEIGHT 
			? HEIGHT
			: computedLegendHeight;

		const legend = d3.select("#chart")
			.append("svg")
			.attr("width", WIDTH)
			.attr("height", legendHeight);
		legend
			.selectAll("circle")
			.data(Object.keys(answersPercentage))
			.enter()
			.append("circle")
			.attr("cx", LEGEND_MARGIN_LEFT)
			.attr("cy", (x, i) => (i + 1) * LEGEND_MARGIN_BETWEEN_ITEMS )
			.attr("r", LEGEND_CIRCLE_SIZE)
			.style("fill", color);
		legend
			.selectAll("text")
			.data(
				Object.entries(answersPercentage)
					.map(
						([answerId, votePercentage]) => 
							[
								votePercentage, 
								answers.find(answer => answer.id === answerId).value
							]
					)
			)
			.enter()
			.append("text")
			.attr("x", LEGEND_MARGIN_LEFT + LEGEND_CIRCLE_SIZE * 2)
			.attr("y", (x, i) => (i + 1) * LEGEND_MARGIN_BETWEEN_ITEMS + LEGEND_CIRCLE_SIZE / 2)
			.text(([votePercentage, answerValue]) => `${answerValue} ${votePercentage}%`);
	});
	return <div id="chart"></div>;
};
PollResult.propTypes = {
	answers: PropTypes.array,
	votes: PropTypes.array
};

export default PollResult;
