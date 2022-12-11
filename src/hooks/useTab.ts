import { useState } from 'react';
import { Nullable } from '~/types/utilityType';

type TTabs = { [tab: string]: () => JSX.Element };

const useTab = (initialTab: Nullable<string>, Tabs: TTabs) => {
  const [tab, setTab] = useState(initialTab);
  return { tab, setTab, TabItem: tab ? Tabs[tab] : null };
};

export default useTab;
