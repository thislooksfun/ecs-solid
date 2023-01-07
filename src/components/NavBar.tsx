import { type Session } from "@auth/core";
import { type Component, Show, Suspense } from "solid-js";

import { User } from "./User";

export type NavBarProps = { session: Session | null | undefined };

export const NavBar: Component<NavBarProps> = props => {
  return (
    <div class="flex w-full items-center bg-cyan-9 p-2 px-4 text-white">
      <a href="/" class="mr-8 text-2xl font-extrabold tracking-wider">
        ECS
      </a>

      <div class="flex-auto" />

      <div>
        <Suspense fallback={<span>loading...</span>}>
          <Show
            when={props.session}
            fallback={<a href="/api/auth/signin">Log In</a>}
          >
            <div class="relative flex items-center gap-3">
              <User user={props.session!.user} />
              <div class="my-1 w-px self-stretch bg-white opacity-50" />
              <a href="/api/auth/signout">Log Out</a>
            </div>
          </Show>
        </Suspense>
      </div>
    </div>
  );
};
