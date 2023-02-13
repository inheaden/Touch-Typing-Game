import React from "react";

export interface Props {}

/**
 *
 */
const Layout = ({ children }: React.PropsWithChildren<Props>) => {
  return (
    <main className="bg-midnight w-full h-full flex flex-col items-center justify-center">
      <div className="max-w-2xl">{children}</div>
    </main>
  );
};

export default Layout;
