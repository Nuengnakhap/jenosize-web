/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";
import classnames from "classnames";

type TabBarLayoutProps = {
  routes: { key: string; title: string }[];
  renderScene: { [key: string]: React.ReactNode };
};

export default function TabBarLayout({
  routes,
  renderScene,
}: TabBarLayoutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentKey = routes[currentIndex].key;

  const scenes = useMemo(() => renderScene, []);

  return (
    <div className="tab-layout">
      <div className="tab-bar-container">
        {routes.map((e, i) => (
          <React.Fragment key={e.key}>
            <div
              className={classnames("tab-item pointer", {
                active: currentIndex == i,
              })}
              onClick={() => setCurrentIndex(i)}
            >
              {e.title}
            </div>
            {i < routes.length - 1 && <div className="tab-divider" />}
          </React.Fragment>
        ))}
      </div>
      <div className="tab-body">{scenes[currentKey]}</div>
    </div>
  );
}
