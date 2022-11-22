import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Button } from './styles';

const isBrowser = typeof window !== "undefined"
const ScrollButton = () => {
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true)
		}
		else if (scrolled <= 300) {
			setVisible(false)
		}
	};

	const scrollToTop = () => {
		if (isBrowser) {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
	};
	if (isBrowser) {  
	window.addEventListener('scroll', toggleVisible);
	}

	return (
		<Button>
			<FaArrowCircleUp onClick={scrollToTop}
				style={{ display: visible ? 'inline' : 'none' }} />
		</Button>
	);
}

export default ScrollButton;
