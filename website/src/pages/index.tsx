import React from "react";

import clsx from "clsx";
import Layout from "@theme/Layout";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { translate } from '@docusaurus/Translate';

import HomepageFeatures from "../components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();

	return (
		<header className={clsx("hero hero--primary", styles.heroBanner)}>
			<div className="container">
				<h1 className="hero__title">{siteConfig.title}</h1>
				<p className="hero__subtitle">{siteConfig.tagline}</p>
				{/* <div className={styles.buttons}>
					<Link
						className="button button--secondary button--lg"
						to="https://medium.com/p/7474359d8484"
					>
						Introduction - 5min ⏱️
          			</Link>
				</div> */}
			</div>
		</header>
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
