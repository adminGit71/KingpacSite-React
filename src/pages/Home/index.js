import React, { createElement, useEffect } from 'react';
import AboutUsSection from './AboutUsSection';
import CommunitySection from './CommunitySection';
import FaqSection from './FaqSection';
import HeroSection from './HeroSection';
import IntroductionSection from './IntroductionSection';
import LeaderboardSection from './LeaderboardSection';
// import OurTeamSection from './OurTeamSection';
import PolicySection from './PolicySection';
import RoadmapSection from './RoadmapSection';
import useUser from '../../hooks/useUser';
import useWallet from '../../hooks/useWallet';
import { INTERVAL_TIME } from '../../utils/constants';
import ScrollFab from '../../components/ScrollFab';

const SECTIONS = [
  {
    id: 'leaderboard',
    pageSection: LeaderboardSection
  },
  {
    id: 'introduction',
    pageSection: IntroductionSection
  },
  {
    id: 'policy',
    pageSection: PolicySection
  },
  {
    id: 'about-us',
    pageSection: AboutUsSection
  },
  {
    id: 'roadmap',
    pageSection: RoadmapSection
  },
  // {
  //   id: 'our-team',
  //   pageSection: OurTeamSection
  // },
  {
    id: 'faq',
    pageSection: FaqSection
  }
];

export default function Home() {
  const { getWinners } = useUser();
  const { getBalanceOfRewardPool } = useWallet();

  useEffect(() => {
    getWinners();
    getBalanceOfRewardPool();
    const interval = setInterval(() => {
      getWinners();
      getBalanceOfRewardPool();
    }, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HeroSection />
      {
        SECTIONS.map((sectionItem, index) => (
          index % 2 === 0 ? (
            createElement(sectionItem.pageSection, {
              bgcolor: '#111111',
              id: sectionItem.id,
              key: sectionItem.id
            })
          ) : (
            createElement(sectionItem.pageSection, {
              bgcolor: 'black',
              id: sectionItem.id,
              key: sectionItem.id
            })
          )
        ))
      }
      <CommunitySection />
      <ScrollFab />
    </>
  );
}