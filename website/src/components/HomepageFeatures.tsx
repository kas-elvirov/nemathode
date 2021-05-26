import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
	{
		title: 'Simple',
		Svg: require('../../static/img/feature - simple.svg').default,
		description: (
			<React.Fragment>
				Just put the operands in the correct position
			</React.Fragment>
		),
	},
	{
		title: 'Modular',
		Svg: require('../../static/img/feature - modular.svg').default,
		description: (
			<React.Fragment>
				Extend your app's math core with needed operands
			</React.Fragment>
		),
	},
	{
		title: 'No coupling',
		Svg: require('../../static/img/feature - no coupling.svg').default,
		description: (
			<React.Fragment>
				Combine any math solutions together as you like
			</React.Fragment>
		),
	},
];

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<Svg className={styles.featureSvg} alt={title} />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
