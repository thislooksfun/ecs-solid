import { type Component } from "solid-js";
import { Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";

import { NavBar } from "~/components/NavBar";
import { ensureSession } from "~/util/auth";

export const routeData = () => {
  return {
    session: createServerData$((_, { request }) => ensureSession(request)),
  };
};

const Page: Component = () => {
  const { session } = useRouteData<typeof routeData>();

  return (
    <>
      <Title>Home</Title>
      <NavBar session={session()} />

      <div class="dark flex w-full justify-center">
        <h1 class="mt-8 inline-block bg-white bg-gradient-to-r from-pink-10 to-violet-10 bg-clip-text text-center text-9xl font-extrabold text-transparent">
          Hello world!
        </h1>
      </div>
    </>
  );
};

export default Page;
