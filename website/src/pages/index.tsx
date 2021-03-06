import React from "react";

import clsx from "clsx";
// import Layout from "@theme/Layout";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { translate } from '@docusaurus/Translate';

import Nemathode from 'nemathode';

import config from '../nemathode/pureJSConfig';
import HomepageFeatures from "../components/HomepageFeatures";

import Layout from '../theme/Layout';

import styles from "./index.module.css";

const nemathode = Nemathode({
	...config,
});

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();

	// just a test
	console.log(nemathode.evaluate([1, '+', 1]));

	return (
		<header className={clsx("hero hero--primary", styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">{siteConfig.title}</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				<p className="hero__syntax_example">
					{/* <Link
						// className="button button--secondary button--lg"
						to="https://codepen.io/kas-elvirov/pen/eYvEJqQ"
					> */}
						{siteConfig.customFields.syntaxExample}
					{/* </Link> */}
				</p>

				<div className={styles.buttons}>
					<Link
						// className="button button--secondary button--lg"
						to="https://codepen.io/kas-elvirov/pen/eYvEJqQ"
					>
						Demo
					</Link>
				</div>

				<div
					className="hero__cat"
					style={{
						display: 'flex',
						top: '50%',
						left: 0,
						paddingTop: '20px',
					}}
				>
					<img
						src={require('../../static/img/cat.png').default}
						height={100}
					/>
				</div>
			</div>
		</header >
	);
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	const title = translate({ message: `${siteConfig.title}` });
	const description = translate({ message: '' });

	return (
		<Layout
			title={title}
			description={description}
		>
			<HomepageHeader />

			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
