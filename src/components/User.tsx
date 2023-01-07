import type { Session } from "@auth/core";
import { type Component, Show } from "solid-js";

export type UserProps = {
  user: Required<Session>["user"];
};

export const User: Component<UserProps> = props => {
  return (
    <div class="inline-flex items-center">
      <Show when={props.user.avatar}>
        <img
          class="mr-2 inline-block aspect-square h-8"
          src={props.user.avatar}
        />
      </Show>

      <span>{props.user.name}</span>
    </div>
  );
};
