import React, { useEffect } from "react";
import PropTypes from "prop-types";

const TwitterShareButton = ({ text }) => {
	useEffect(function loadTwitterWidget() {
		window.twttr.widgets.load();
	}, []);

	return (
		<a 
			href={`https://twitter.com/share?ref_src=twsrc%5Etfw&text=Survey: ${text}`}
			className="twitter-share-button" 
			data-show-count="false"
		>
			Tweet
		</a> 
	);
};
TwitterShareButton.propTypes = {
	text: PropTypes.string.isRequired
};


export default TwitterShareButton;
