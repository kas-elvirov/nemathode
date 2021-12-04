import React from 'react';

import OriginalLayout from '@theme-original/Layout';

import Head from '@docusaurus/Head';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Layout(props) {
    const { siteConfig } = useDocusaurusContext();

    return (
        <>
            <Head>
                <meta property="og:url" content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={siteConfig.title} />
                <meta property="og:description" content={siteConfig.tagline} />
                <meta property="og:image" content={require('../../static/img/logo.png').default} />
                <meta property="og:image:width" content={'2000px'} />
                <meta property="og:image:height" content={'2000px'} />
            </Head>
            <OriginalLayout {...props} />
        </>
    );
}